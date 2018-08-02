# Autohost Infrastructure on AWS

Deploy hosted infrastructure on AWS using Serverless

## Setup

Install ```serverless``` globally:

```bash
npm install serverless@1.25.0 -g
```

## Deploy

Deploy using ```serverless```:

```bash
AWS_PROFILE=voloviv sls deploy -v \
    --region us-east-1 \
    --stage dev
```


Deploy using `aws-cli`:

```bash
aws cloudformation create-stack \
    --stack-name voloviv-app-dev \
    --capabilities CAPABILITY_NAMED_IAM \
    --tags Key=Project,Value=voloviv.com Key=Environment,Value=prod \
    --parameters file://$(pwd)/config.json \
    --template-body file://$(pwd)/cloudformation.yaml
```

>For more info, visit the [aws-cli docs](http://docs.aws.amazon.com/cli/latest/reference/cloudformation/create-stack.html)

### Update Stack

To update an existing stack, run the following:

```bash
aws cloudformation update-stack \
    --stack-name voloviv-app-dev \
    --capabilities CAPABILITY_NAMED_IAM \
    --tags Key=Project,Value=voloviv.com Key=Environment,Value=prod \
    --parameters file://$(pwd)/config.json \
    --template-body file://$(pwd)/cloudformation.yaml
```
