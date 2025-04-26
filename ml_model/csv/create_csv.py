import csv

# Define the CSV file name
filename = "project_allocation.csv"

# Define column headers
headers = [
    "Student_ID",
    "Student_Name",
    "Department",
    "Project_Preference_1",
    "Project_Preference_2",
    "Project_Preference_3",
    "Allocated_Project",
    "Previous_Projects"
]

# Define the data
data = [
    [101, "Alice Johnson", "CSE", "AI Chatbot", "Web Scraper", "IoT Smart Home", "", "Library App, E-commerce site"],
    [102, "Bob Smith", "IT", "ML-based Recommender", "Cloud Management", "Network Security", "", "Network Monitoring System"],
    [103, "Charlie Lee", "ECE", "IoT Smart Home", "Embedded Systems", "Robotics Arm", "", "Automated Traffic Light"],
    [104, "David Clark", "CSE", "Web Scraper", "AI Chatbot", "Cloud Management", "", "Blog Website, Python Scripts"],
    [105, "Emma Brown", "IT", "Cloud Management", "ML-based Recommender", "AI Chatbot", "", "Data Analysis Dashboard"]
]

def create_csv():
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)

        # Write headers
        writer.writerow(headers)

        # Write data
        writer.writerows(data)

    print(f"CSV file '{filename}' created successfully.")


def add_row(new_row):
    """Adds a new row to the CSV file"""
    with open(filename, mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(new_row)
    print("New row added successfully.")

def remove_row(student_id):
    """Removes a row based on Student_ID"""
    updated_data = []
    with open(filename, mode="r") as file:
        reader = csv.reader(file)
        updated_data = [row for row in reader if row[0] != str(student_id)]

    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(updated_data)
    
    print(f"Row with Student_ID {student_id} removed successfully.")

def update_row(student_id, updated_row):
    """Updates a row based on Student_ID"""
    updated_data = []
    with open(filename, mode="r") as file:
        reader = csv.reader(file)
        headers = next(reader)  # Read headers
        updated_data.append(headers)

        for row in reader:
            if row[0] == str(student_id):
                updated_data.append(updated_row)  # Replace with new row
            else:
                updated_data.append(row)  # Keep old row

    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(updated_data)
    
    print(f"Row with Student_ID {student_id} updated successfully.")

# Example usage
if __name__ == "__main__":
    create_csv()  # Create the initial CSV file

    # Add a new row
    add_row([106, "Frank White", "ECE", "Blockchain Security", "AI Ethics", "IoT in Healthcare", "", "Smart Traffic System"])

    # Remove a row (by Student_ID)
    remove_row(103)

    # Update a row
    update_row(102, [102, "Bob Smith", "IT", "AI Chatbot", "Cloud Security", "Blockchain", "ML Project", "Network Monitoring, Data Science"])


