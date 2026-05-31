[Link to Hands On](terraform-handson.md)
[Link to Remote State](terraform-arch-remote-state.md)

# expressions vs functions

- ***expressions** are statements that produce a value , The Logic Flow
- **functions** are pre-built tools you call *within* those expressions to transform data. The Data Transformers**

**Key Differences**

| Feature           | Expressions                                            | Functions                                                     |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| **Definition**    | The syntax used to represent or compute a value.       | Pre-defined logic used to manipulate data.                    |
| **Customization** | You write them yourself using HCL syntax.              | You **cannot** define your own; you must use built-in ones.   |
| **Examples**      | `var.instance_type`, `1 + 2`, `a == b ? "yes" : "no"`. | `upper("hello")`, `length(var.list)`, `file("./id_rsa.pub")`. |
| **Role**          | Serves as the "sentence" or logic flow.                | Serves as a "tool" to modify parts of that sentence.          |

You almost always use functions **inside** expressions. For example, in a [local value](https://developer.hashicorp.com/terraform/language/values/locals):
````hcl
locals {
  # The entire line is an expression
  # 'upper' and 'trimspace' are functions being used within it
  instance_name = upper(trimspace(var.raw_name)) 
}
````

**Key Takeaway:** Think of **Expressions** as the "grammar" of your code and **Functions** as the "power tools" you use to shape the data within that code.

## **1. Expressions: The Logic Flow**
- **Types of Expressions:**

  - **Conditional (Ternary):** `condition ? true_val : false_val`.
  - **For Loops:** `[for s in var.list : upper(s)]`.
  - **Splat:** `var.list[*].id` (shorthand for iterating over a list).
  - **Splat:** `aws_instance.web[*].public_ip` (grabs all IPs from a resource list).
  - **Operators:** Arithmetic (`+`, `-`) and logical (`&&`, `||`).
  - **Arithmetic:** `count.index + 1` (used to number resources).
  - **Logical:** `var.create_db && var.env == "prod"` (returns true only if both are met).
  - **String Template:** `"Hello, ${var.name}!"` (string interpolation).
  - **Heredoc:** `<<EOT ... EOT` (multi-line string blocks).
```hcl
## Conditional (Ternary) & Logic
"prod" == "prod" ? "high-availability" : "single-instance"  # result: high-availability # Simulate a variable check
(5 + 5 == 10) && (1 != 2) ? "logic works" : "logic failed" # result: logic works
1 > 2 ? "yes" : "no" # result: no 

## For Loops & Functions
[for s in ["a", "abc", "de", "fghi"] : s if length(s) > 2] #result: ["abc", "fghi"]
[for name in ["1", "2"] : "prod-${name}"] #result: ["prod-1", "prod-2"]

## Splat Expressions, Iterator
element(tolist([{"ip"="1", "dns"="1.1"}, {"ip"="2", "dns"="1.1"}][*].dns), 1)
[{"ip"="1", "dns"="1.1"}, {"ip"="2", "dns"="1.1"}][*].ip #result: ["1", "2"]

##. Arithmetic & Indexing
Simulate 'count.index + 1' for naming resources 1-3
[for i in [0, 1, 2] : i + 1] # result: [1, 2, 3]
````

##  **2. Functions: The Data Transformers**

Functions are built-in utilities that take inputs (arguments) and return a transformed result. You call them using the syntax `function_name(arg1, arg2)`.
- **Numeric:** `max(1, 5, 10)` (returns 10), `abs(-5)` (returns 5).
- **Collection:** `merge(map1, map2)` (combines maps), `flatten(list_of_lists)` (makes a nested list flat).
- **IP Network:** `cidrsubnet("10.0.0.0/16", 8, 2)` (calculates subnets).
- **Date/Time:** `timestamp()` (current time), `formatdate("YYYY-MM-DD", timestamp())`.

**String Functions**

- `join(separator, list)`: Combine a list into a single string.
- `trimspace(string)`: Remove whitespace.
- `lookup(map, key, default)`: Safely get a value from a map.
- `merge(map1, map2)`: Combine multiple maps into one (great for tags).
- `element(list, index)`: Get a specific item from a list.
- `flatten(list_of_lists)`: Turn nested lists into a single flat list.


```hcl
[join("-", ["cloud", "infra", "prod"]),replace("hello-world", "world", "terraform"), trimspace("   hello terraform   ")]

[
  lookup(
  {
     Name = "server-dev"
     Department = "Engineering1"
  }, "Department", "Unknown" # result: "Engineering1"
  ),
  lookup(
    {
      Name = "server-dev"
      Department = "Engineering1"
    }, "Department1", "Unknown" # result:  "Unknown"
  ),
  merge(
    {
      Name = "server-${lower("DEV")}"
      Date = timestamp()
    },
    { Department = "Engineering1" } 
	    # result: {
		#     "Date" = "2026-03-03T17:47:16Z"
		#     "Department" = "Engineering1"  
		#     "Name" = "server-dev"
		#   },
  ),
  element(["a", "b", "c"], 1), # result: "b",
  jsonencode(flatten([
    ["a", "b"],
    ["c", "d"]
  ])) 		# result:  "[\"a\",\"b\",\"c\",\"d\"]"
]
```

```hcl
[
  jsonencode({ "placeholder" = "placeholder" }), # result: "{\"placeholder\":\"placeholder\"}"
  jsonencode(tolist(values({ a = 1, b = 2 }))), # result: "[1,2]"
  jsonencode(tolist(keys({ a = 1, b = 2 }))),  # result: "[\"a\",\"b\"]"
  jsonencode(tomap({ a = 1, b = 2 })), # result: "{\"a\":1,\"b\":2}"
  jsonencode(tolist([1, 2, 3, 1, 2, 3])),# result: "[1,2,3,1,2,3]"
  jsonencode(toset([1, 2, 3, 1, 2, 3])),# result: "[1,2,3]"
  jsondecode("{\"name\": \"server-01\", \"active\": true}"),
  # result: {
	#     "active" = true
	#     "name" = "server-01"
	#   },
]
```

##  3\. Dynamic Blocks

When you need to generate multiple repeated nested blocks (like security group rules) based on a variable, you use a `dynamic` block.

```hcl
[for port in [80, 443, 22] : { from_port = port, to_port = port, protocol = "tcp" }]
```
or 
```hcl
variable "inbound_ports" {
  type    = list(number)
  default = [80, 443, 8080]
}

resource "aws_security_group" "main" {
  name = "multi-port-sg"
  
  # Generates an 'ingress' block for every port in the list
  dynamic "ingress" {
    for_each = var.inbound_ports
    content {
      from_port   = ingress.value
    }
  }

# If "ingress" feels confusing as both the block name and the variable name, you can rename the iterator using the `iterator` argument:

  dynamic "ingress" {
    for_each = var.inbound_ports
    iterator = port  # Rename it here
    content {
      from_port = port.value # Now use port.value
      # ...
    }
  }
} 
```

1\. The Basic Block Structure

Every configuration is built using blocks. The general pattern is:\
`block_type "label_1" "label_2" { ... }`

```hcl
# This is a comment
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Attribute: Key = Value
  instance_type = "t2.micro"              # String value
}
```

2\. Core Block Types

Here are the five essential blocks you will use 90% of the time:

| Block           | Purpose                                                               |
| --------------- | --------------------------------------------------------------------- |
| **`terraform`** | Configures Terraform settings (required version, backend, providers). |
| **`provider`**  | Tells Terraform which API to talk to (AWS, Azure, Google).            |
| **`resource`**  | Defines a physical component (VPC, Server, Database).                 |
| **`variable`**  | Input values to make your code reusable.                              |
| **`output`**    | Values to display after deployment (like an IP address).              |

4\. Key Syntax Rules

- **Strings:** Must be wrapped in double quotes `" "`.
- **Lists:** Defined with square brackets `["a", "b"]`.
- **Maps:** Defined with curly braces `{key = "value"}`.
- **References:** Access other resources using `type.name.attribute` (e.g., `aws_instance.web.id`).
- **Conditionals:** Uses ternary logic: `condition ? true_val : false_val`.

Phase 2: Professional Best Practices (The "Senior" Way)

Once you can deploy a single resource, shift your focus to how Terraform is used in production teams.

- **DRY Principle**: Use **modules** to avoid repeating code. Instead of copying 50 lines for a VPC, create a reusable module.
- **Remote State**: Move from local state files to remote backends (like AWS S3 with DynamoDB locking) to prevent data loss and allow team collaboration.
- **Code Organization**: Separate your code by environments (e.g., `staging/`, `production/`) and use meaningful file names like `main.tf`, `variables.tf`, and `outputs.tf`.

**Pro-Tip**: Don't just follow tutorials. Find an app you've built, manually create its infrastructure in the cloud, and then try to **reverse-engineer** it into Terraform. Breaking things in a lab environment is your fastest path to seniority.

2\. Essential Debugging Skills
## `Debug`

### `graph`

```

t plan -out=tfplan && t show -json tfplan > plan.tfgraph

```

### `print debug`

```

TF_LOG=TRACE terraform plan 2>&1 | awk '{$1=""; print $0}' > debug_no_timestamp.log

TF_LOG=DEBUG terraform plan -out=tfplan > log_plan.txt 2> log_debug.txt

```

### `use tfstate`

```

t state list

t state show 'docker_container.nginx["tutorial-1"]'

```
### use t show to get all resource status
```
terraform show -json
```