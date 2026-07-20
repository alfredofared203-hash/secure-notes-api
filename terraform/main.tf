terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# ==========================
# S3 Bucket غير آمن
# ==========================

resource "aws_s3_bucket" "notes_bucket" {
  bucket = "secure-notes-demo-bucket-123456"

  tags = {
    Name = "Secure Notes Bucket"
  }
}

# ==========================
# Security Group غير آمن
# ==========================

resource "aws_security_group" "web_sg" {

  name = "web-security-group"

  ingress {

    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    # ❌ مفتوح للعالم
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {

    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    # ❌ مفتوح للعالم
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {

    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Web SG"
  }
}