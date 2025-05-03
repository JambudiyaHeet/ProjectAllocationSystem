# # # import pandas as pd
# # # import mysql.connector
# # # from sklearn.feature_extraction.text import TfidfVectorizer
# # # from sklearn.metrics.pairwise import cosine_similarity

# # # def get_project_data():
# # #     # Connect to MySQL
# # #     db = mysql.connector.connect(
# # #         host="localhost",
# # #         user="root",  # replace with your db username
# # #         password="#F00TBALl",  # replace with your db password
# # #         database="projectallocationsystem"   # replace with your database
# # #     )

# # #     # Read table
# # #     df = pd.read_sql("SELECT * FROM project1", con=db)
# # #     db.close()
# # #     return df

# # # def build_similarity_matrix(df, column):
# # #     """Create similarity matrix based on a specific column"""
# # #     vectorizer = TfidfVectorizer()
# # #     tfidf = vectorizer.fit_transform(df[column].fillna(''))
# # #     sim_matrix = cosine_similarity(tfidf)
# # #     return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

# # # def find_similar_project_ids(project_ids):
# # #     df = get_project_data()

# # #     # Create combined and title-only text fields
# # #     df['combined'] = (
# # #         df['title'].fillna('') + ' ' +
# # #         df['definition'].fillna('') + ' ' +
# # #         df['description'].fillna('') + ' ' +
# # #         df['prog_lang1'].fillna('') + ' ' +
# # #         df['prog_lang2'].fillna('') + ' ' +
# # #         df['prog_lang3'].fillna('') + ' ' +
# # #         df['database_used'].fillna('')
# # #     )

# # #     # Similarity matrices
# # #     full_sim = build_similarity_matrix(df, 'combined')
# # #     title_sim = build_similarity_matrix(df, 'title')

# # #     recommended_ids = set()

# # #     for pid in project_ids:
# # #         if pid not in df['id'].values:
# # #             print(f"Project ID {pid} not found.")
# # #             continue

# # #         # Top 2 similar by all fields
# # #         full_sim_scores = full_sim[pid].sort_values(ascending=False)
# # #         full_sim_scores = full_sim_scores.drop(pid)
# # #         top_full = full_sim_scores.head(2).index.tolist()

# # #         # Top 2 similar by title only
# # #         title_sim_scores = title_sim[pid].sort_values(ascending=False)
# # #         title_sim_scores = title_sim_scores.drop(pid)
# # #         top_title = title_sim_scores.head(2).index.tolist()

# # #         recommended_ids.update(top_full + top_title)

# # #     # Remove input IDs from results
# # #     recommended_ids.difference_update(set(project_ids))

# # #     # Return list of unique recommended project IDs
# # #     return list(recommended_ids)

# # # similar_project_ids = find_similar_project_ids([1])
# # # print("Recommended Project IDs:", similar_project_ids)

# # from flask import Flask, request, jsonify
# # import pandas as pd
# # import mysql.connector
# # from sklearn.feature_extraction.text import TfidfVectorizer
# # from sklearn.metrics.pairwise import cosine_similarity
# # from flask_cors import CORS  # <-- important for React calls

# # app = Flask(__name__)
# # CORS(app)  # Allow frontend to call this backend

# # def get_project_data():
# #     db = mysql.connector.connect(
# #         host="localhost",
# #         user="root",  # replace with your db username
# #         password="#F00TBALl",  # replace with your db password
# #         database="projectallocationsystem"   # replace with your database
# #     )

# #     df = pd.read_sql("SELECT * FROM project", con=db)
# #     db.close()
# #     return df

# # def build_similarity_matrix(df, column):
# #     vectorizer = TfidfVectorizer()
# #     tfidf = vectorizer.fit_transform(df[column].fillna(''))
# #     sim_matrix = cosine_similarity(tfidf)
# #     return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

# # def find_similar_project_ids(project_ids):
# #     df = get_project_data()
# #     df['combined'] = (
# #         df['title'].fillna('') + ' ' +
# #         df['definition'].fillna('') + ' ' +
# #         df['description'].fillna('') + ' ' +
# #         df['prog_lang1'].fillna('') + ' ' +
# #         df['prog_lang2'].fillna('') + ' ' +
# #         df['prog_lang3'].fillna('') + ' ' +
# #         df['database_used'].fillna('')
# #     )

# #     full_sim = build_similarity_matrix(df, 'combined')
# #     title_sim = build_similarity_matrix(df, 'title')

# #     recommended_ids = set()

# #     for pid in project_ids:
# #         if pid not in df['id'].values:
# #             continue
# #         full_sim_scores = full_sim[pid].sort_values(ascending=False)
# #         full_sim_scores = full_sim_scores.drop(pid)
# #         top_full = full_sim_scores.head(2).index.tolist()

# #         title_sim_scores = title_sim[pid].sort_values(ascending=False)
# #         title_sim_scores = title_sim_scores.drop(pid)
# #         top_title = title_sim_scores.head(2).index.tolist()

# #         recommended_ids.update(top_full + top_title)

# #     recommended_ids.difference_update(set(project_ids))
    
# #     similar_projects = df[df['id'].isin(recommended_ids)].to_dict(orient='records')
# #     # ids = [item['id'] for item in similar_projects]  # Extract only the 'id' fields
# #     # return jsonify(ids)
# #     ids = [item['id'] for item in similar_projects]
# #     print(ids)
# #     return ids

# # # API Route
# # @app.route('/api/similar-projects', methods=['POST'])
# # def similar_projects():
# #     data = request.get_json()
# #     project_ids = data.get('project_ids', [])
# #     projects = find_similar_project_ids(project_ids)
# #     return jsonify(projects)

# # if __name__ == '__main__':
# #     app.run(port=5000, debug=True)


from flask import Flask, request, jsonify
import pandas as pd
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, origin=['http://localhost:5173'])
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


def get_project_data():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="#F00TBALl",
        database="projectallocationsystem"
    )
    df = pd.read_sql("SELECT * FROM project", con=db)
    db.close()
    return df

def build_similarity_matrix(df, column, method="tfidf"):
    if method == "tfidf":
        vectorizer = TfidfVectorizer(ngram_range=(1,2))  # Use bi-grams also
    elif method == "count":
        vectorizer = CountVectorizer()
    elif method == "svd":
        tfidf = TfidfVectorizer(ngram_range=(1,2))
        tfidf_matrix = tfidf.fit_transform(df[column].fillna(''))
        svd = TruncatedSVD(n_components=100)  # Reduce dimensions
        reduced = svd.fit_transform(tfidf_matrix)
        sim_matrix = cosine_similarity(reduced)
        return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])
    else:
        raise ValueError("Unknown method for vectorization.")
    
    tfidf_matrix = vectorizer.fit_transform(df[column].fillna(''))
    sim_matrix = cosine_similarity(tfidf_matrix)
    return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

def keyword_overlap(project1, project2):
    """Simple keyword-based similarity (accuracy measure)."""
    set1 = set(project1.lower().split())
    set2 = set(project2.lower().split())
    if not set1 or not set2:
        return 0.0
    return len(set1 & set2) / len(set1 | set2)

def calculate_accuracy(df, input_ids, recommended_ids):
    input_texts = df[df['id'].isin(input_ids)]['combined'].tolist()
    recommended_texts = df[df['id'].isin(recommended_ids)]['combined'].tolist()
    
    if not input_texts or not recommended_texts:
        return 0.0

    scores = []
    for input_text in input_texts:
        for rec_text in recommended_texts:
            scores.append(keyword_overlap(input_text, rec_text))
    
    return round(sum(scores) / len(scores), 4) if scores else 0.0

def find_similar_project_ids(project_ids, method="tfidf"):
    df = get_project_data()
    df['combined'] = (
        df['title'].fillna('') + ' ' +
        df['definition'].fillna('') + ' ' +
        df['description'].fillna('') + ' ' +
        df['prog_lang1'].fillna('') + ' ' +
        df['prog_lang2'].fillna('') + ' ' +
        df['prog_lang3'].fillna('') + ' ' +
        df['database_used'].fillna('')
    )

    full_sim = build_similarity_matrix(df, 'combined', method)
    title_sim = build_similarity_matrix(df, 'title', method)

    recommended_ids = set()

    for pid in project_ids:
        if pid not in df['id'].values:
            continue
        full_sim_scores = full_sim[pid].sort_values(ascending=False)
        full_sim_scores = full_sim_scores.drop(pid)
        top_full = full_sim_scores.head(2).index.tolist()

        title_sim_scores = title_sim[pid].sort_values(ascending=False)
        title_sim_scores = title_sim_scores.drop(pid)
        top_title = title_sim_scores.head(2).index.tolist()

        recommended_ids.update(top_full + top_title)

    recommended_ids.difference_update(set(project_ids))

    # Calculate accuracy
    accuracy = calculate_accuracy(df, project_ids, recommended_ids)
    print(f"Accuracy ({method} model): {accuracy}")

    similar_projects = df[df['id'].isin(recommended_ids)].to_dict(orient='records')
    ids = [item['id'] for item in similar_projects]
    return ids

@app.route('/api/similar-projects', methods=['POST'])
def similar_projects():
    try:
        data = request.get_json()
        project_ids = data.get('project_ids', [])

        if not project_ids:
            return jsonify({"error": "No project_ids provided"}), 400

        print("----- TF-IDF Model -----")
        projects_tfidf = find_similar_project_ids(project_ids, method="tfidf")

        return jsonify(projects_tfidf)
    
    except Exception as e:
        print(f"Error in similar_projects API: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)

# from flask import Flask, request, jsonify
# import pandas as pd
# import mysql.connector
# from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.decomposition import TruncatedSVD
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Allow from your React frontend

# # ------------------ DB Connection ------------------
# def get_project_data():
#     db = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="#F00TBALl",
#         database="projectallocationsystem"
#     )
#     df = pd.read_sql("SELECT * FROM project", con=db)
#     db.close()
#     return df

# # ------------------ Similarity Building ------------------
# def build_similarity_matrix(df, column, method="tfidf"):
#     if method == "tfidf":
#         vectorizer = TfidfVectorizer(ngram_range=(1,2))
#         matrix = vectorizer.fit_transform(df[column].fillna(''))
#         sim_matrix = cosine_similarity(matrix)
#         return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

#     elif method == "count":
#         vectorizer = CountVectorizer()
#         matrix = vectorizer.fit_transform(df[column].fillna(''))
#         sim_matrix = cosine_similarity(matrix)
#         return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

#     elif method == "svd":
#         vectorizer = TfidfVectorizer(ngram_range=(1,2))
#         tfidf_matrix = vectorizer.fit_transform(df[column].fillna(''))
#         n_features = tfidf_matrix.shape[1]
#         n_components = min(50, n_features - 1)  # Auto-adjust if features are less
#         svd = TruncatedSVD(n_components=n_components)
#         reduced = svd.fit_transform(tfidf_matrix)
#         sim_matrix = cosine_similarity(reduced)
#         return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])
    
#     else:
#         raise ValueError(f"Unknown method {method}")

# # ------------------ Accuracy Calculation ------------------
# def keyword_overlap(text1, text2):
#     """Simple Jaccard similarity over words."""
#     set1 = set(text1.lower().split())
#     set2 = set(text2.lower().split())
#     if not set1 or not set2:
#         return 0.0
#     return len(set1 & set2) / len(set1 | set2)

# def calculate_accuracy(df, input_ids, recommended_ids):
#     input_texts = df[df['id'].isin(input_ids)]['combined'].tolist()
#     recommended_texts = df[df['id'].isin(recommended_ids)]['combined'].tolist()

#     if not input_texts or not recommended_texts:
#         return 0.0

#     scores = []
#     for input_text in input_texts:
#         for rec_text in recommended_texts:
#             scores.append(keyword_overlap(input_text, rec_text))

#     return round(sum(scores) / len(scores), 4) if scores else 0.0

# # ------------------ Core Recommendation Logic ------------------
# # def find_similar_project_ids(project_ids, method="tfidf"):
# #     df = get_project_data()
# #     df['combined'] = (
# #         df['title'].fillna('') + ' ' +
# #         df['definition'].fillna('') + ' ' +
# #         df['description'].fillna('') + ' ' +
# #         df['prog_lang1'].fillna('') + ' ' +
# #         df['prog_lang2'].fillna('') + ' ' +
# #         df['prog_lang3'].fillna('') + ' ' +
# #         df['database_used'].fillna('')
# #     )

# #     full_sim = build_similarity_matrix(df, 'combined', method)
# #     title_sim = build_similarity_matrix(df, 'title', method)

# #     recommended_ids = set()

# #     for pid in project_ids:
# #         if pid not in df['id'].values:
# #             continue
# #         full_sim_scores = full_sim[pid].sort_values(ascending=False)
# #         full_sim_scores = full_sim_scores.drop(pid)
# #         top_full = full_sim_scores.head(2).index.tolist()

# #         title_sim_scores = title_sim[pid].sort_values(ascending=False)
# #         title_sim_scores = title_sim_scores.drop(pid)
# #         top_title = title_sim_scores.head(2).index.tolist()

# #         recommended_ids.update(top_full + top_title)

# #     recommended_ids.difference_update(set(project_ids))

# #     accuracy = calculate_accuracy(df, project_ids, recommended_ids)
# #     similar_projects = df[df['id'].isin(recommended_ids)].to_dict(orient='records')
# #     ids = [item['id'] for item in similar_projects]
# #     return ids, accuracy

# def find_similar_project_ids(project_ids, method="tfidf"):
#     df = get_project_data()
#     df['combined'] = (
#         df['title'].fillna('') + ' ' +
#         df['definition'].fillna('') + ' ' +
#         df['description'].fillna('') + ' ' +
#         df['prog_lang1'].fillna('') + ' ' +
#         df['prog_lang2'].fillna('') + ' ' +
#         df['prog_lang3'].fillna('') + ' ' +
#         df['database_used'].fillna('')
#     )

#     full_sim = build_similarity_matrix(df, 'combined', method)
#     title_sim = build_similarity_matrix(df, 'title', method)

#     recommended_ids = set()

#     for pid in project_ids:
#         if pid not in df['id'].values:
#             continue

#         full_sim_scores = full_sim[pid].drop(pid).sort_values(ascending=False)
#         top_full = full_sim_scores.head(2).index.tolist()

#         title_sim_scores = title_sim[pid].drop(pid).sort_values(ascending=False)
#         top_title = title_sim_scores.head(2).index.tolist()

#         recommended_ids.update(top_full + top_title)

#     # Ensure only non-input project IDs are returned
#     recommended_ids = list(recommended_ids - set(project_ids))
    
#     accuracy = calculate_accuracy(df, project_ids, recommended_ids)
    
#     return recommended_ids


# # ------------------ API Route ------------------
# # ------------------ API Route ------------------
# @app.route('/api/similar-projects', methods=['POST'])
# def similar_projects():
#     try:
#         data = request.get_json()
#         project_ids = data.get('project_ids', [])

#         if not project_ids:
#             return jsonify({"error": "No project_ids provided"}), 400

#         # Using only TF-IDF method for recommendations
#         projects, acc = find_similar_project_ids(project_ids, method="tfidf")

#         print(f"TF-IDF Recommendation Accuracy: {acc}")

#         # Return only the list of recommended IDs
#         return jsonify(projects)

#     except Exception as e:
#         print(f"Error in similar_projects API: {str(e)}")
#         return jsonify({"error": str(e)}), 500


#     except Exception as e:
#         print(f"Error in similar_projects API: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # ------------------ Run the App ------------------
# if __name__ == '__main__':
#     app.run(port=5000, debug=True)

# from flask import Flask, request, jsonify
# import pandas as pd
# import mysql.connector
# from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.decomposition import TruncatedSVD
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Allow from your React frontend

# # ------------------ DB Connection ------------------
# def get_project_data():
#     db = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="#F00TBALl",
#         database="projectallocationsystem"
#     )
#     df = pd.read_sql("SELECT * FROM project", con=db)
#     db.close()
#     return df

# # ------------------ Similarity Building ------------------
# def build_similarity_matrix(df, column, method="tfidf"):
#     if method == "tfidf":
#         vectorizer = TfidfVectorizer(ngram_range=(1,2))
#         matrix = vectorizer.fit_transform(df[column].fillna(''))
#         sim_matrix = cosine_similarity(matrix)
#         return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

#     elif method == "count":
#         vectorizer = CountVectorizer()
#         matrix = vectorizer.fit_transform(df[column].fillna(''))
#         sim_matrix = cosine_similarity(matrix)
#         return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

#     elif method == "svd":
#         vectorizer = TfidfVectorizer(ngram_range=(1,2))
#         tfidf_matrix = vectorizer.fit_transform(df[column].fillna(''))
#         n_features = tfidf_matrix.shape[1]
#         n_components = min(50, n_features - 1)  # Auto-adjust if features are less
#         svd = TruncatedSVD(n_components=n_components)
#         reduced = svd.fit_transform(tfidf_matrix)
#         sim_matrix = cosine_similarity(reduced)
#         return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])
    
#     else:
#         raise ValueError(f"Unknown method {method}")

# # ------------------ Accuracy Calculation ------------------
# def keyword_overlap(text1, text2):
#     """Simple Jaccard similarity over words."""
#     set1 = set(text1.lower().split())
#     set2 = set(text2.lower().split())
#     if not set1 or not set2:
#         return 0.0
#     return len(set1 & set2) / len(set1 | set2)

# def calculate_accuracy(df, input_ids, recommended_ids):
#     input_texts = df[df['id'].isin(input_ids)]['combined'].tolist()
#     recommended_texts = df[df['id'].isin(recommended_ids)]['combined'].tolist()

#     if not input_texts or not recommended_texts:
#         return 0.0

#     scores = []
#     for input_text in input_texts:
#         for rec_text in recommended_texts:
#             scores.append(keyword_overlap(input_text, rec_text))

#     return round(sum(scores) / len(scores), 4) if scores else 0.0

# # ------------------ Core Recommendation Logic ------------------
# def find_similar_project_ids(project_ids, method="tfidf"):
#     df = get_project_data()
#     df['combined'] = (
#         df['title'].fillna('') + ' ' +
#         df['definition'].fillna('') + ' ' +
#         df['description'].fillna('') + ' ' +
#         df['prog_lang1'].fillna('') + ' ' +
#         df['prog_lang2'].fillna('') + ' ' +
#         df['prog_lang3'].fillna('') + ' ' +
#         df['database_used'].fillna('')
#     )

#     full_sim = build_similarity_matrix(df, 'combined', method)
#     title_sim = build_similarity_matrix(df, 'title', method)

#     recommended_ids = set()

#     for pid in project_ids:
#         if pid not in df['id'].values:
#             continue
#         full_sim_scores = full_sim[pid].sort_values(ascending=False)
#         full_sim_scores = full_sim_scores.drop(pid)
#         top_full = full_sim_scores.head(2).index.tolist()

#         title_sim_scores = title_sim[pid].sort_values(ascending=False)
#         title_sim_scores = title_sim_scores.drop(pid)
#         top_title = title_sim_scores.head(2).index.tolist()

#         recommended_ids.update(top_full + top_title)

#     recommended_ids.difference_update(set(project_ids))

#     accuracy = calculate_accuracy(df, project_ids, recommended_ids)
#     similar_projects = df[df['id'].isin(recommended_ids)].to_dict(orient='records')
#     ids = [item['id'] for item in similar_projects]
#     return ids

# # ------------------ API Route ------------------
# # ------------------ API Route ------------------
# @app.route('/api/similar-projects', methods=['POST'])
# def similar_projects():
#     try:
#         data = request.get_json()
#         project_ids = data.get('project_ids', [])

#         if not project_ids:
#             return jsonify({"error": "No project_ids provided"}), 400

#         # Using only TF-IDF method for recommendations
#         projects, acc = find_similar_project_ids(project_ids, method="tfidf")

#         print(f"TF-IDF Recommendation Accuracy: {acc}")

#         # Return only the list of recommended IDs
#         return jsonify(projects)

#     except Exception as e:
#         print(f"Error in similar_projects API: {str(e)}")
#         return jsonify({"error": str(e)}), 500


#     except Exception as e:
#         print(f"Error in similar_projects API: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # ------------------ Run the App ------------------
# if __name__ == '__main__':
#     app.run(port=5000, debug=True)
