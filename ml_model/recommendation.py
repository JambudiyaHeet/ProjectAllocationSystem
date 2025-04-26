# import pandas as pd
# import mysql.connector
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# def get_project_data():
#     # Connect to MySQL
#     db = mysql.connector.connect(
#         host="localhost",
#         user="root",  # replace with your db username
#         password="#F00TBALl",  # replace with your db password
#         database="projectallocationsystem"   # replace with your database
#     )

#     # Read table
#     df = pd.read_sql("SELECT * FROM project1", con=db)
#     db.close()
#     return df

# def build_similarity_matrix(df, column):
#     """Create similarity matrix based on a specific column"""
#     vectorizer = TfidfVectorizer()
#     tfidf = vectorizer.fit_transform(df[column].fillna(''))
#     sim_matrix = cosine_similarity(tfidf)
#     return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

# def find_similar_project_ids(project_ids):
#     df = get_project_data()

#     # Create combined and title-only text fields
#     df['combined'] = (
#         df['title'].fillna('') + ' ' +
#         df['definition'].fillna('') + ' ' +
#         df['description'].fillna('') + ' ' +
#         df['prog_lang1'].fillna('') + ' ' +
#         df['prog_lang2'].fillna('') + ' ' +
#         df['prog_lang3'].fillna('') + ' ' +
#         df['database_used'].fillna('')
#     )

#     # Similarity matrices
#     full_sim = build_similarity_matrix(df, 'combined')
#     title_sim = build_similarity_matrix(df, 'title')

#     recommended_ids = set()

#     for pid in project_ids:
#         if pid not in df['id'].values:
#             print(f"Project ID {pid} not found.")
#             continue

#         # Top 2 similar by all fields
#         full_sim_scores = full_sim[pid].sort_values(ascending=False)
#         full_sim_scores = full_sim_scores.drop(pid)
#         top_full = full_sim_scores.head(2).index.tolist()

#         # Top 2 similar by title only
#         title_sim_scores = title_sim[pid].sort_values(ascending=False)
#         title_sim_scores = title_sim_scores.drop(pid)
#         top_title = title_sim_scores.head(2).index.tolist()

#         recommended_ids.update(top_full + top_title)

#     # Remove input IDs from results
#     recommended_ids.difference_update(set(project_ids))

#     # Return list of unique recommended project IDs
#     return list(recommended_ids)

# similar_project_ids = find_similar_project_ids([1])
# print("Recommended Project IDs:", similar_project_ids)

from flask import Flask, request, jsonify
import pandas as pd
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS  # <-- important for React calls

app = Flask(__name__)
CORS(app)  # Allow frontend to call this backend

def get_project_data():
    db = mysql.connector.connect(
        host="localhost",
        user="root",  # replace with your db username
        password="#F00TBALl",  # replace with your db password
        database="projectallocationsystem"   # replace with your database
    )

    df = pd.read_sql("SELECT * FROM project", con=db)
    db.close()
    return df

def build_similarity_matrix(df, column):
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(df[column].fillna(''))
    sim_matrix = cosine_similarity(tfidf)
    return pd.DataFrame(sim_matrix, index=df['id'], columns=df['id'])

def find_similar_project_ids(project_ids):
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

    full_sim = build_similarity_matrix(df, 'combined')
    title_sim = build_similarity_matrix(df, 'title')

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
    
    similar_projects = df[df['id'].isin(recommended_ids)].to_dict(orient='records')
    # ids = [item['id'] for item in similar_projects]  # Extract only the 'id' fields
    # return jsonify(ids)
    ids = [item['id'] for item in similar_projects]
    print(ids)
    return ids

# API Route
@app.route('/api/similar-projects', methods=['POST'])
def similar_projects():
    data = request.get_json()
    project_ids = data.get('project_ids', [])
    projects = find_similar_project_ids(project_ids)
    return jsonify(projects)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
