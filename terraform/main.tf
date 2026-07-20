# إعداداتterraform غير آمنة تكشفها أداة Checkov
resource "aws_s3_bucket" "vulnerable_bucket" {
  bucket = "my-sec-notes-bucket-12345"
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.vulnerable_bucket.id

  # خطأ أمني: السماح بالوصول العام
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}