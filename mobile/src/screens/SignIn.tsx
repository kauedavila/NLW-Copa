import { Text, Center } from "native-base";

export function SignIn() {
  return (
    <Center
      flex={1}
      bgColor="gray.900"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="white" fontSize={24} fontFamily="heading">
        SignIn
      </Text>
    </Center>
  );
}
