resource "pagerduty_team" "parent" {
  name        = var.team_name
  description = var.team_description
}

resource "pagerduty_team" "child" {
  name        = "Engineering"
  description = "All engineering"
  parent      = pagerduty_team.parent.id
}
