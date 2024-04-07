from fastapi import UploadFile

# Upload a file to Firebase Storage
def upload_file(bucket, file: UploadFile, destination_blob_name: str):
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_file(file.file)

# Delete a file to Firebase Storage
def remove_file(bucket, blob_path: str):
    blob = bucket.blob(blob_path)
    blob.delete()
