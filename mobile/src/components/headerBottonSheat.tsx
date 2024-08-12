import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface HeaderProps extends BottomSheetHandleProps {
  animatedIndex: Animated.SharedValue<number>;
}

const HeaderBottomSheet: React.FC<HeaderProps> = ({ animatedIndex }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 75] // Altura final do header
    );

    const opacity = interpolate(animatedIndex.value, [0, 1], [0, 1]);

    return {
      height,
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.headerContainer, animatedStyle]}>
      <View style={styles.headerContent}>
        <Image
          source={{ uri: "link_da_imagem_ou_usar_o_require_se_ela_estiver_local" }}
          style={styles.cardImage}
        />
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Buscar últimas compras</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterButton}>USUÁRIOS</Text>
        <Text style={styles.filterButton}>CATEGORIAS</Text>
        <Text style={styles.filterButton}>MODALIDADES</Text>
        <Text style={styles.filterButton}>TIPOS</Text>
      </View>
    </Animated.View>
  );
};

export default HeaderBottomSheet;

const styles = StyleSheet.create({
  headerContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: "#ccc",
    overflow: "hidden", // Para garantir que o conteúdo não ultrapasse a borda
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  cardImage: {
    width: 50,
    height: 30,
    marginRight: 16,
    // Aqui você pode ajustar o estilo da imagem conforme necessário
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    color: "#888",
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  filterButton: {
    color: "#888",
    fontWeight: "bold",
  },
});
