terraform {
  required_version = ">=0.13.0"
  required_providers {
    pagerduty = {
      source  = "PagerDuty/pagerduty"
      version = ">=1.9.6"
    }

    local = {
      source  = "hashicorp/local"
      version = ">=1.3.0"
    }

  }
}
