import authClient from "@/lib/auth-client";
import { Text, View } from "react-native";

export default function Painel() {
  const session = authClient.getSession();
  console.log(session.then((res) => console.log(res.data)));
  return (
    <View>
      <Text>Painel</Text>
    </View>
  );
}
