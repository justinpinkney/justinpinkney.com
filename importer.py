from pathlib import Path
import sys
import json
import hashlib
import os
import datetime

from tinydb import TinyDB, Query
from PIL import Image
import pysftp
import imageio

from dotenv import load_dotenv
load_dotenv()

image_types = (".jpg", ".png", ".jpeg", ".tiff", ".tif")
video_types = (".mp4", ".gif")

MAX_RESOLUTION = 1024
STORAGE_PATH = Path("content/data/stream")

def store_file(hash_id, file_path):
    """Place large files on the server"""
    host = os.getenv("FTP_ADDRESS")
    username = os.getenv("FTP_USERNAME")
    password = os.getenv("FTP_PASSWORD")
    cnopts = pysftp.CnOpts(knownhosts='known_hosts')
    
    remote_path = "assets.justinpinkney.com/stream/" + hash_id

    with pysftp.Connection(host=host,username=username,password=password,cnopts=cnopts) as server:
        server.put(file_path, remote_path)

    return "http://" + remote_path

def load_db():    
    json_path = STORAGE_PATH/"db.json"
    return TinyDB(json_path)

def get_hash(file_path):
    """https://stackoverflow.com/a/3431838"""
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def parse_image(file_path):
    """Get the hash and resized version of an image"""
    im = Image.open(file_path)

    if any([x > MAX_RESOLUTION for x in im.size]):
        im.thumbnail((MAX_RESOLUTION, MAX_RESOLUTION))
    
    hash_id = get_hash(file_path)
    
    return hash_id, im


def parse_video(file_path):
    """Get the hash and preview image of a video"""
    reader = imageio.get_reader(file_path)
    n_frames = reader.get_length()
    target_frame = min(30, n_frames)
    im = Image.fromarray(reader.get_data(target_frame))

    if any([x > MAX_RESOLUTION for x in im.size]):
        im.thumbnail((MAX_RESOLUTION, MAX_RESOLUTION))
    
    hash_id = get_hash(file_path)
    
    return hash_id, im


def store_image(hash_id, im, base_directory):
    """Store an image
    Returns the file path relative to the base directory"""
    filename = (hash_id + ".jpg")
    full_path = base_directory/filename
    im = im.convert("RGB")
    im.save(full_path)

    return filename

def main(import_dir):
    """Import a directory into the database"""
    db = load_db()

    all_files = import_dir.rglob("**/*")
    for file_path in all_files:
        
        remote_storage = False

        if file_path.suffix in image_types:
            hash_id, im = parse_image(file_path)
        elif file_path.suffix in video_types:
            hash_id, im = parse_video(file_path)
            remote_storage = True
        else:
            print(f"Not importing {file_path}")
            continue

        # if it's not a dupe
        stored_file_path = store_image(hash_id, im, STORAGE_PATH)

        t = os.path.getmtime(file_path)
        t = datetime.datetime.fromtimestamp(t).strftime("%Y-%m-%d")

        entry = {"id": hash_id, 
                 "image": str(stored_file_path), 
                "date": str(t),
                "remote_path": "",
                }

        if remote_storage:
            print("todo storage")
            #entry["remote_path"] = store_file(hash_id, file_path)
            

        db.insert(entry)

def export():
    """Export to plain json file."""
    db = load_db()
    all_entries = db.all()
    with open(STORAGE_PATH/"stream.json", "w") as f:
        json.dump(all_entries, f)

if __name__ == "__main__":
    import_dir = Path(sys.argv[1])
    main(import_dir)
    export()