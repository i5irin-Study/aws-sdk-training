import { CloudFormationClient, CreateStackCommand } from "@aws-sdk/client-cloudformation";

const main = async () => {
  const client = new CloudFormationClient({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_ACCESS_SECRET!,
    },
  });
  const createStack = new CreateStackCommand({
    StackName: process.env.STACK_NAME,
    TemplateURL: process.env.CFN_TEMPLATE_ROOT,
    Parameters: [
      {
        ParameterKey: 'TemplateNetwork',
        ParameterValue: process.env.CFN_TEMPLATE_NETWORK,
      },
      {
        ParameterKey: 'TemplateSecurity',
        ParameterValue: process.env.CFN_TEMPLATE_SECURITY,
      },
      {
        ParameterKey: 'TemplateApplication',
        ParameterValue: process.env.CFN_TEMPLATE_APPLICATION,
      },
      {
        ParameterKey: 'SSHFromAddress',
        ParameterValue: process.env.CFN_EC2_SSH_FROM_ADDRESS,
      },
    ],
  });
  try {
    const data = await client.send(createStack);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

(async ()=> {
  await main();
})();
