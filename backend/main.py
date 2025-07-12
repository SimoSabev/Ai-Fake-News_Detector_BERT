from fastapi import FastAPI
from typing import Any, Union
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import requests
import os

# Hugging Face линк към .pt модела
MODEL_URL = "https://huggingface.co/Simo08/bert-fake-news/resolve/main/bert_fake_news_model.pt"
model_path = "bert_fake_news_model.pt"

# Ако моделът не е свален, изтегли го
if not os.path.exists(model_path):
    print("Сваляне на модела от Hugging Face...")
    with open(model_path, "wb") as f:
        f.write(requests.get(MODEL_URL).content)
    print("Свалянето завърши.")

# Инициализиране
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)
model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()

# FastAPI App
app = FastAPI(title="Fake News Detector (BERT)")

# Схема за заявка
class NewsItem(BaseModel):
    text: str

# Predict endpoint
@app.post("/predict")
def predict_news(item: NewsItem):
    inputs = tokenizer(item.text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1).squeeze()
        prediction = torch.argmax(probs).item()
        confidence = round(probs[prediction].item() * 100, 2)

    label = "Real" if prediction == 1 else "Fake"
    return {"prediction": label, "confidence": f"{confidence}%"}
