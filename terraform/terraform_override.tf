terraform {
  backend "s3" {
    region               = "us-east-1"
    bucket               = "probelab-infra-github-mgmt"
    key                  = "terraform.tfstate"
    workspace_key_prefix = "org"
    dynamodb_table       = "github-mgmt"
  }
}
