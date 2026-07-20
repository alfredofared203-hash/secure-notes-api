provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "bad" {
  name = "bad-security-group"

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_s3_bucket" "bad_bucket" {
  bucket = "devsecops-demo-bucket-123456"
}