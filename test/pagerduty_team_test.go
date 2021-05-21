package test

import (
	"testing"

	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/stretchr/testify/assert"
)

func TestBasicSuccess(t *testing.T) {
	t.Parallel()

	team := "main"
	description := "test description"

	terraformOptions := &terraform.Options{
		// The path to where your Terraform code is located
		TerraformDir: "./../examples/team",
		Upgrade:      true,
		Vars: map[string]interface{}{
			"team_name":        team,
			"team_description": description,
		},
	}

	// At the end of the test, run `terraform destroy` to clean up any resources that were created
	defer terraform.Destroy(t, terraformOptions)

	// This will run `terraform init` and `terraform apply` and fail the test if there are any errors
	terraform.InitAndApply(t, terraformOptions)
	outputTeam := terraform.Output(t, terraformOptions, "team")
	assert.NotEmpty(t, outputTeam, outputTeam)
}
