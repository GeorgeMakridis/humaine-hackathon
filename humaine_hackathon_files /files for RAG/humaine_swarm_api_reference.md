# HumAIne Swarm — Conversational MLOps Assistant Reference
## RAG Knowledge Document for HumAIne Swarm Chatbot

**Project:** HumAIne Swarm (Conversational AI for Human-Machine Collaborative MLOps)  
**Published:** DCOSS-IoT 2025 (DOI: 10.1109/DCOSS-IoT65416.2025.00162)  
**Docker Hub:** `gfatouros/humaine-swarm:latest`  
**HumAIne project:** Grant Agreement 101120218

---

## 1 — What is HumAIne Swarm

The HumAIne Swarm Assistant is an intelligent conversational agent that enables researchers and developers to interact with the HumAIne project's MLOps infrastructure through natural language. It supports:

- **Documentation Q&A** — answers questions about the HumAIne project, its architecture, deliverables, and technical components using RAG over indexed project documents
- **Kubeflow management** — list, inspect, run, and monitor ML pipelines through conversation
- **MinIO storage interaction** — browse and retrieve pipeline artifacts, models, datasets, metrics
- **ML workflow support** — guidance on setting up pipelines, troubleshooting, and comparing run results

The Swarm Assistant operationalises the Swarm Learning paradigm: LLM agents coordinate and delegate to specialised tools, collectively providing more capable assistance than any single agent could.

---

## 2 — Architecture

### 2.1 Technology Stack

| Component | Technology |
|---|---|
| LLM | OpenAI GPT-4.1-mini |
| Agent Framework | LangChain + LlamaIndex |
| UI | Chainlit (chat interface, port 8000) |
| Vector DB (RAG) | Pinecone |
| MLOps | Kubeflow |
| Object Storage | MinIO |
| Authentication | Keycloak (OAuth) |
| Language | Python (>=3.11, <3.13) |
| Package Management | Poetry |

### 2.2 Architecture Layers

```
User (Chainlit Chat)
    ↓
Application Core (app.py)
    ↓ ← → User Session Manager (Keycloak OAuth)
LLM Agent Framework (LangChain / LlamaIndex)
    ↓
OpenAI GPT-4.1-mini
    ↓
┌──────────────────────────────────────┐
│          Integration Layer           │
│  Kubeflow │ MinIO │ Pinecone (RAG)   │
└──────────────────────────────────────┘
```

### 2.3 How RAG Works in HumAIne Swarm

1. User query arrives via Chainlit
2. The LLM agent framework processes the query
3. If the query requires project knowledge, a RAG tool queries Pinecone for semantically similar document chunks
4. Retrieved chunks are injected into the prompt context
5. GPT-4.1-mini generates a response grounded in the retrieved knowledge
6. Response is returned via Chainlit

**This is why indexing documents correctly matters:** The chatbot's ability to answer HumAIne-specific questions (including hackathon AL and XAI questions) depends entirely on what has been indexed into Pinecone.

---

## 3 — Capabilities

### 3.1 Documentation and Knowledge Retrieval
- Answer questions about the HumAIne project goals, architecture, and components
- Retrieve relevant documents via semantic search from the Pinecone knowledge base
- Optimise user queries for better retrieval (query expansion)
- Explain HumAIne concepts: Active Learning, Swarm Learning, Neuro-Symbolic AI, XAI

### 3.2 Kubeflow MLOps Management
- List available pipelines, experiments, and runs
- Get details about specific pipeline versions and configurations
- Trigger and monitor pipeline executions
- Create and manage Kubeflow experiments
- Retrieve user namespace information

### 3.3 MinIO Storage
- List buckets and contents
- Retrieve pipeline artifacts: models, datasets, metrics, HTML visualisations
- Compare metrics across different pipeline runs

### 3.4 ML Workflow Support
- Guide users through setting up and running ML pipelines
- Provide information on available components, models, datasets
- Troubleshoot common pipeline issues

---

## 4 — Setup and Deployment

### 4.1 Local Development

```bash
# 1. Clone and configure
cp env.sh.example env.sh
# Edit env.sh: add OpenAI key, Pinecone key, MinIO credentials, Kubeflow host

# 2. Source environment
source env.sh

# 3. Install (requires Python >=3.11, <3.13 and Poetry)
poetry install

# 4. Run
chainlit run app.py -w
# Available at: http://localhost:8000
```

### 4.2 Docker (Pre-built Image)

```bash
# Pull image
docker pull gfatouros/humaine-swarm:latest

# Configure
cp .env-example .env
# Edit .env:
#   OPENAI_API_KEY=...
#   PINECONE_API_KEY=...
#   OAUTH_KEYCLOAK_CLIENT_SECRET=...
#   KUBEFLOW_HOST=http://huanew-kubeflow.ddns.net/pipeline

# Run
docker run -d \
  --name humaine-swarm-assistant \
  -p 8000:8000 \
  --env-file .env \
  --restart unless-stopped \
  gfatouros/humaine-swarm:latest
```

### 4.3 Key Environment Variables

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | GPT-4.1-mini inference |
| `PINECONE_API_KEY` | Vector database for RAG |
| `OAUTH_KEYCLOAK_CLIENT_SECRET` | Authentication |
| `MINIO_ENDPOINT` | MinIO storage (default: s3-minio.humaine-horizon.eu) |
| `KUBEFLOW_HOST` | Kubeflow pipeline host |
| `LOG_LEVEL` | Logging verbosity (default: ERROR) |

---

## 5 — RAG Indexing Guidelines

### 5.1 What to Index for Hackathon Support

For the KPI-2.3 hackathon experiment, the following documents should be indexed into Pinecone in this priority order:

| Priority | Document | Reason |
|---|---|---|
| 1 | `humaine_rag_technical_reference.md` | Hackathon-specific: exact API patterns with HumAIne rationale |
| 2 | `humaine_al_hackathon.ipynb` | Exact variable names and notebook structure |
| 3 | `humaine_explainerdashboard_api_reference.md` | Complete XAI API reference |
| 4 | `humal_api_reference.md` | HumAL AL architecture and workflow |
| 5 | `D5.4_Training_Centre_Development.pdf` | Project context for AL and XAI |
| 6 | `D5.1_Platform_Integration.docx` | HumAIne platform architecture |
| 7 | `text_explanation_20newsgroups_demo.ipynb` | Reference implementation |
| 8 | `library_components_overview.md` | XAI library overview |

### 5.2 Chunking Recommendations

For optimal RAG retrieval on these documents:
- **Chunk size:** 500–800 tokens
- **Overlap:** 100–150 tokens
- **Metadata to store per chunk:** `source_file`, `section_title`, `document_type` (reference/notebook/deliverable)
- **Do NOT chunk code blocks mid-function** — keep complete function definitions together

### 5.3 Test Queries After Indexing

Validate the RAG setup by querying the chatbot with these before the hackathon:

```
1. "Show me the modAL ActiveLearner constructor for LogisticRegression with entropy_sampling"
2. "Which query strategy for 4 classes with 12 initial labels and why?"
3. "How do I wrap a trained learner in ClassifierExplainer? Why use learner.estimator not learner?"
4. "Write a predict_fn closure for LIME on TF-IDF text — what are the common mistakes?"
5. "How do I display explainer.plot_importances() in Colab?"
6. "What is the relationship between HumAL's dispatch labeling and modAL's query-teach cycle?"
7. "What SHAP backend does ClassifierExplainer select for LogisticRegression?"
8. "How does entropy_sampling differ from uncertainty_sampling for multi-class problems?"
```

Each answer should reference HumAIne architecture and produce code with the exact variable names from the hackathon notebook (`X_pool`, `y_pool`, `X_test_df`, `vectorizer`, `feature_names`, `TEAM_NAMES`).

---

## 6 — Example Conversations (Expected Quality)

### Query: "Which classifier should I use?"
**Expected answer:** Use `LogisticRegression(max_iter=1000)`. TF-IDF vectors are high-dimensional and sparse — LogisticRegression handles this setting best. It natively supports `predict_proba()` needed for uncertainty query strategies, and selecting it means `ClassifierExplainer` will use `shap.LinearExplainer` — fast and exact for linear models. This aligns with HumAIne's design for the ticketing pilot.

### Query: "Show me the ActiveLearner constructor"
**Expected answer:**
```python
from modAL.models import ActiveLearner
from modAL.uncertainty import entropy_sampling
from sklearn.linear_model import LogisticRegression

learner = ActiveLearner(
    estimator=LogisticRegression(max_iter=1000),
    query_strategy=entropy_sampling,
    X_training=X_initial,
    y_training=y_initial
)
```

### Query: "Write predict_fn for LIME"
**Expected answer:**
```python
def predict_fn(texts):
    X_sparse = vectorizer.transform(pd.Series(texts).fillna(''))
    X_df = pd.DataFrame(X_sparse.toarray(), columns=feature_names)
    return learner.predict_proba(X_df)
```
With explanation: `.fillna('')` handles None/empty strings, `.toarray()` converts sparse to dense, `predict_proba` returns probabilities needed by LIME.

---

## 7 — Citation

```bibtex
@INPROCEEDINGS{11096208,
  author={Fatouros, George and Makridis, Georgios and Kousiouris, George and
          Soldatos, John and Tsadimas, Anargyros and Kyriazis, Dimosthenis},
  booktitle={2025 21st International Conference on Distributed Computing in
             Smart Systems and the Internet of Things (DCOSS-IoT)},
  title={Towards Conversational AI for Human-Machine Collaborative MLOps},
  year={2025},
  pages={1079-1086},
  doi={10.1109/DCOSS-IoT65416.2025.00162}
}
```

---

*HumAIne EU Project — Grant Agreement 101120218*  
*For RAG indexing into HumAIne Swarm chatbot*
