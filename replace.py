import os
import re

def replace_strings_in_folder(folder_path, old_pattern, new_pattern):
    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith(".md"):
                print(file_name)
                file_path = os.path.join(root, file_name)
                with open(file_path, "r") as file:
                    content = file.read()

                updated_content = re.sub(old_pattern, new_pattern, content)

                with open(file_path, "w") as file:
                    file.write(updated_content)

    print("String replacement completed.")

# Usage example
folder_path = "content/blog"  # Replace with the path to your folder containing the text files
old_pattern = r"!\[\]\((.+?\.(?:jpg|jpeg|png))\)"
new_pattern = r'{% blogImage "\1", "" %}'

replace_strings_in_folder(folder_path, old_pattern, new_pattern)
