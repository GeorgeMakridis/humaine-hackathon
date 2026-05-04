# 🟥 Group B — Instruction Card

## Your Task

Build an Active Learning + XAI pipeline for ticket routing.  
Open **`humaine_al_hackathon.ipynb`** in Google Colab and complete **Cell 3** (AL task) then **Cell 5** (XAI task).

---

## Your Resources

Standard public resources only:
- **modAL docs:** https://modal-python.readthedocs.io/en/latest/content/models/ActiveLearner.html
- **explainerdashboard docs:** https://explainerdashboard.readthedocs.io
- **LIME docs:** https://lime-ml.readthedocs.io/en/latest/lime.html#lime.lime_text.LimeTextExplainer
- **Google / Stack Overflow**

---

## Cell 3 — AL Quick Reference

### ActiveLearner constructor (modAL)
```python
learner = ActiveLearner(
    estimator=<classifier_instance>,
    query_strategy=<strategy_function>,
    X_training=X_initial,
    y_training=y_initial
)
```

### Query-teach cycle
```python
# Step 1: ask which samples to label
query_idx, query_instance = learner.query(X_pool, n_instances=N)

# Step 2: retrieve true labels from simulation
new_labels = y_pool[query_idx]

# Step 3: update the model
learner.teach(X_pool[query_idx], new_labels)

# Step 4: shrink the pool
X_pool = np.delete(X_pool, query_idx, axis=0)
y_pool = np.delete(y_pool, query_idx, axis=0)
```

### Available classifiers
| Classifier | Notes |
|---|---|
| `LogisticRegression(max_iter=1000)` | Fast, good on sparse text, supports predict_proba |
| `RandomForestClassifier(n_estimators=100)` | Non-linear, slower |
| `SVC(kernel='rbf', probability=True)` | Strong but slow; needs `probability=True` |

### Available query strategies
| Strategy | What it does |
|---|---|
| `uncertainty_sampling` | most uncertain single prediction |
| `margin_sampling` | smallest gap between top-2 classes |
| `entropy_sampling` | highest uncertainty across ALL classes |

---

## Cell 5 — XAI Quick Reference

### ClassifierExplainer (explainerdashboard)
```python
from explainerdashboard import ClassifierExplainer

explainer = ClassifierExplainer(
    learner.estimator,   # underlying sklearn model (not learner itself)
    X_test_df,           # pandas DataFrame with named feature columns
    y_test_series,       # pandas Series of true labels
    labels=TEAM_NAMES    # list of class names for readable plots
)
```

### predict_fn for LIME (text pipeline)
```python
def predict_fn(texts):
    """Raw text list → probability matrix (n_texts, n_classes)."""
    X_sparse = vectorizer.transform(pd.Series(texts).fillna(''))
    X_df     = pd.DataFrame(X_sparse.toarray(), columns=feature_names)
    return learner.predict_proba(X_df)
```

### SHAP importance plot
```python
fig = explainer.plot_importances()
fig.show()
```

### LIME text explanation
```python
from lime.lime_text import LimeTextExplainer

lime_exp = LimeTextExplainer(class_names=TEAM_NAMES)
exp = lime_exp.explain_instance(
    test_texts.iloc[0],   # raw text of one ticket
    predict_fn,           # your predict_fn from Part B
    num_features=10,      # top 10 influential words
    top_labels=2          # for the 2 most likely teams
)
exp.show_in_notebook(text=True)
```

---

## You Are Done When

- Cell 3 prints `✅ Round 1 complete` → run Cell 4
- Cell 5 prints `✅ XAI cell complete`
- **Record on Measurement Sheet:** AL config time, XAI config time, total config time, final AL accuracy

---

## ⏱️ Time limit: _______ minutes
