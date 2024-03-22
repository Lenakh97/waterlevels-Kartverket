import { readFile } from "fs/promises";
import { PutParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({});
export const writeToSSM = async () => {
  const certContents = await readFilesFromMap(/*files*/);
  console.log(certContents);
  for (const [k, content] of Object.entries(certContents)) {
    console.log(k, content);
    const cont = JSON.parse(content);
    for (const [name, value] of Object.entries(cont)) {
      await ssm.send(
        new PutParameterCommand({
          Name: `/hello-nrfcloud-waterlevel/credentials/${k}/${name}`,
          Value: value as string,
          Type: "String",
          Overwrite: true,
        })
      );
    }
  }
};

export const readFilesFromMap = async (
  fileMap: Record<string, string>
): Promise<Record<string, string>> => {
  const contents = await Promise.all(
    Object.entries(fileMap).map<Promise<[string, string]>>(
      async ([key, path]) => [
        key,
        await readFile("./" + path + ".json", "utf-8"),
      ]
    )
  );

  return contents.reduce(
    (contentsMap, [key, content]) => ({ ...contentsMap, [key]: content }),
    {}
  );
};
