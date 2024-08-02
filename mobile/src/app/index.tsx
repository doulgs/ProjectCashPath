import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useToken } from "@/storages/useToken";
import { useUserStore } from "@/storages/useUserStore";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { LinearGradient } from "@/components/linearGradient";
import { Loading } from "@/components/loading";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Campo usuario obrigatório"),
  password: yup.string().required("Campo senha é obrigatória"),
});

export default function App() {
  const { validateSignIn, getUserDetails, user, loading, error, logout } = useUserStore();
  const { saveToken, getToken, removeToken } = useToken();
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }: FormValues) => {
    try {
      const saveData = true;
      await validateSignIn({ login: email, password });

      if (saveData && user?.token) {
        saveToken(user.token);
        router.navigate("/stacks");
      }
    } catch (error) {
      Alert.alert("Sistema", `Erro identificado - ${error}`, [{ text: "OK" }]);
    } finally {
      Keyboard.dismiss();
    }
  };

  const getInfoUser = async () => {
    try {
      const access_token = await getToken();
      if (access_token) {
        await getUserDetails(access_token);
        router.navigate("/stacks");
      } else {
        removeToken();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LinearGradient>
      <SafeAreaView className="flex-1">
        <View className="flex-grow flex-shrink">
          <KeyboardAwareScrollView className="">
            <View className="flex-1 items-center justify-center my-9">
              <Image
                alt="App Logo"
                resizeMode="contain"
                className="h-[80px] w-[80px] mt-16 mb-9"
                source={require("@/assets/images/icon-rounded.png")}
              />

              <Text className="text-5xl font-bold mb-1 text-zinc-300">
                <Text className="text-green-600 font-extrabold">CashPath</Text>
              </Text>

              <Text className="font-medium text-zinc-400 text-center px-8">
                Descubra para onde seu dinheiro vai e tome o controle das suas finanças!
              </Text>
            </View>

            <View className="mb-6 px-6 flex-shrink flex-grow">
              <View className="mb-4">
                <Text className="mb-4 text-lg text-zinc-200 font-semibold">
                  Endereço de Email
                </Text>
                <Input>
                  <Input.ControlledField
                    name="email"
                    control={control}
                    placeholder="john@example.com"
                    keyboardType="email-address"
                  />
                </Input>
                {errors.email && (
                  <Text className="text-red-500 ml-4">{errors.email.message}</Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="mb-4 text-lg text-zinc-200 font-semibold">
                  Senha de acesso
                </Text>
                <Input>
                  <Input.ControlledField
                    control={control}
                    name="password"
                    placeholder="********"
                    secureTextEntry={true}
                  />
                </Input>
                {errors.password && (
                  <Text className="text-red-500">{errors.password.message}</Text>
                )}
              </View>

              <View className="mt-2">
                <Button
                  variant="solid"
                  isLoading={loading}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Button.Title>Acessar</Button.Title>
                </Button>
              </View>
            </View>

            <Pressable className="mt-4">
              <Text className="font-semibold text-green-600 text-center">
                Esqueci minha senha?
              </Text>
            </Pressable>

            <Pressable className="mt-4">
              <Text className="text-center text-zinc-400 font-semibold">
                Não tem uma conta?
                <Text style={{ textDecorationLine: "underline" }}>Cadastre-se</Text>
              </Text>
            </Pressable>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
