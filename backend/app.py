import os

dataset_path = "./dataset/raw/CoconutLeaves"

for cls in os.listdir(dataset_path):
    class_path = os.path.join(dataset_path, cls)

    if os.path.isdir(class_path):
        image_count = 0

        for root, dirs, files in os.walk(class_path):
            image_count += len([
                f for f in files
                if f.lower().endswith((".jpg", ".jpeg", ".png"))
            ])

        print(f"{cls}: {image_count}")