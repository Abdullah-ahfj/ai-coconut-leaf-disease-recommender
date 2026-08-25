from pathlib import Path

import numpy as np
import tensorflow as tf
from PIL import Image

from tensorflow.keras.applications.mobilenet_v2 import preprocess_input


BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "trained_models" / "custom_cnn_baseline.keras"


CLASS_NAMES = [
    "CCI_Caterpillars",
    "CCI_Leaflets",
    "Gray Leaf Spot",
    "Healthy_Leaves",
    "Leaf Rot",
    "WCLWD_DryingofLeaflets",
    "WCLWD_Flaccidity",
    "WCLWD_Yellowing",
]


print("Loading prediction model...")


model = tf.keras.models.load_model(
    MODEL_PATH,
    custom_objects={
        "preprocess_input": preprocess_input
    }
)


print("Prediction model loaded successfully.")



# Add image prediction function

def predict_image(image_path):
    image = Image.open(image_path).convert("RGB")

    image = image.resize((224, 224))

    image_array = np.array(
        image,
        dtype=np.float32
    )

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    predictions = model.predict(
        image_array,
        verbose=0
    )[0]

    predicted_index = int(
        np.argmax(predictions)
    )

    confidence = float(
        predictions[predicted_index]
    )

    predicted_class = CLASS_NAMES[
        predicted_index
    ]

    return {
        "predicted_class": predicted_class,
        "confidence": round(
            confidence * 100,
            2
        )
    }