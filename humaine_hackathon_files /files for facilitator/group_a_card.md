# 🟦 Group A — Instruction Card

## Your Task

Build an Active Learning + XAI pipeline for ticket routing.  
Open **`humaine_al_hackathon.ipynb`** in Google Colab and complete **Cell 3** (AL task) then **Cell 5** (XAI task).

---

## Your Resources — Use Them Fully

### 1. HumAIne Swarm Chat Assistant
**URL:** `_______________________________________`

The assistant knows HumAIne's architecture, the modAL library, the `humaine-explainerdashboard` package, LIME, and SHAP. Ask it anything. Be specific. It can produce working code directly.

**Suggested questions for Cell 3 (AL):**

> *"For Active Learning on TF-IDF text with 4 classes and 12 initial labels, which classifier and query strategy should I use? Show me the modAL ActiveLearner constructor call."*

> *"Show me one complete query-teach cycle with modAL's ActiveLearner. I have X_pool, y_pool and want to query N_QUERIES_PER_ROUND samples."*

**Suggested questions for Cell 5 (XAI):**

> *"How do I wrap a sklearn LogisticRegression in a ClassifierExplainer from humaine-explainerdashboard? I have X_test_df as a DataFrame and y_test_series. Show me the exact constructor call."*

> *"I need to write a predict_fn closure for LIME on text data. My model was trained on TF-IDF features. The function takes a list of raw strings and must return a probability matrix. Show me the implementation using a TfidfVectorizer called vectorizer and feature_names."*

> *"How do I call explainer.plot_importances() and display it in Colab?"*

> *"Show me how to run LimeTextExplainer.explain_instance() on a raw text string using my predict_fn, and display inline with show_in_notebook()."*

### 2. HumAIne Learning Centre
**URL:** `_______________________________________`

**For AL (Cell 3):** Technical Users Programme → Module 3 → *Foundations of Human-AI Collaboration Lecture 2*

**For XAI (Cell 5):** Technical Users Programme → Module 3 → *Neuro-Symbolic AI Unpacked* and *Benchmarking & Performance Evaluation*

---

## What You Write

### Cell 3 (AL Task)
```
Part A: MY_CLASSIFIER = ???
        MY_QUERY_STRATEGY = ???
        N_QUERIES_PER_ROUND = ???

Part B.1: learner = ActiveLearner(...)

Part B.2: Step 1 — learner.query(...)
          Step 2 — new_labels = y_pool[query_idx]
          Step 3 — learner.teach(...)
          Step 4 — np.delete(X_pool...) and np.delete(y_pool...)
```

### Cell 5 (XAI Task)
```
Part A: explainer = ClassifierExplainer(learner.estimator, ...)

Part B: def predict_fn(texts):
            X_sparse = vectorizer.transform(...)
            X_df = pd.DataFrame(...)
            return learner.predict_proba(X_df)

Part C: fig = explainer.plot_importances()
        fig.show()

Part D: lime_exp = LimeTextExplainer(class_names=TEAM_NAMES)
        exp = lime_exp.explain_instance(...)
        exp.show_in_notebook(text=True)
```

---

## You Are Done When

- Cell 3 prints `✅ Round 1 complete` → run Cell 4
- Cell 5 prints `✅ XAI cell complete`
- **Record on Measurement Sheet:** AL config time, XAI config time, total config time, final AL accuracy

---

## ⏱️ Time limit: _______ minutes
