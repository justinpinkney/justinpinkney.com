import importer

from pathlib import Path

from PIL import Image

def test_parse_image():
    test_file = "test-data/1.png"
    hash_id, image = importer.parse_image(test_file)

    assert isinstance(image, Image.Image)
    assert isinstance(hash_id, str)


def test_parse_image_resize_image():
    """Big image are resized"""
    test_file = "test-data/2000.jpg"
    hash_id, image = importer.parse_image(test_file)

    assert image.size == (importer.MAX_RESOLUTION, importer.MAX_RESOLUTION)

def test_parse_video():
    test_file = "test-data/flowers1.mp4"
    hash_id, image = importer.parse_video(test_file)

    assert isinstance(image, Image.Image)
    assert isinstance(hash_id, str)

def test_store_image(tmp_path): 
    hash_id = "abc"
    im = Image.new("RGB", (100, 100))

    returned_path = importer.store_image(hash_id, im, tmp_path)

    expected_path = tmp_path/(hash_id + ".jpg")

    assert expected_path.exists()
    assert str(returned_path) == str(returned_path)


def test_main(tmp_path):
    expected_1 = {"id": "44da489ff3dab4becc5bc467c86d2c93",
                    "image": "44da489ff3dab4becc5bc467c86d2c93.jpg",
                    "date": "2020-07-15",
                    "remote_path": "",
                    }
    expected_2 = {"id": "f85fe02c1025a903c0307113a6d9253c",
                    "image": "f85fe02c1025a903c0307113a6d9253c.jpg",
                    "date": "2020-07-15",
                    "remote_path": "",
                    }

    import_dir = Path("test-data")
    importer.STORAGE_PATH = tmp_path
    importer.main(import_dir)

    db = importer.load_db()
    all_entries = db.all()

    assert len(all_entries) == 3 # 2 images above and a video
    assert expected_1 in all_entries
    assert expected_2 in all_entries

def test_dont_add_dupes(tmp_path):
    expected_1 = {"id": "44da489ff3dab4becc5bc467c86d2c93",
                    "image": "44da489ff3dab4becc5bc467c86d2c93.jpg",
                    "date": "2020-07-15",
                    "remote_path": "",
                    }
    expected_2 = {"id": "f85fe02c1025a903c0307113a6d9253c",
                    "image": "f85fe02c1025a903c0307113a6d9253c.jpg",
                    "date": "2020-07-15",
                    "remote_path": "",
                    }

    import_dir = Path("test-data")
    importer.STORAGE_PATH = tmp_path
    importer.main(import_dir)
    importer.main(import_dir)

    db = importer.load_db()
    all_entries = db.all()

    assert len(all_entries) == 3 # 2 images above and a video
    assert expected_1 in all_entries
    assert expected_2 in all_entries