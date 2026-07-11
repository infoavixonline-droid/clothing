import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import { useState, useMemo } from "react"
import products from "../data/products.json"
import ProductCard from "../components/ProductCard"

type SortKey = "newest" | "price-asc" | "price-desc"

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sort, setSort] = useState<SortKey>("newest")

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (sort === "newest") {
      list.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
    } else if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price)
    } else {
      list.sort((a, b) => b.price - a.price)
    }
    return list
  }, [activeCategory, sort])

  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="12">
      {/* Header */}
      <VStack align="start" gap="2" mb="10">
        <Text fontSize="xs" color="fg.subtle" letterSpacing="widest" textTransform="uppercase">
          Collection
        </Text>
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" letterSpacing="tight" color="fg">
          All Products
        </Heading>
      </VStack>

      {/* Filters */}
      <Box mb="8" pb="6" borderBottom="1px solid" borderColor="border.subtle">
        <HStack justify="space-between" flexWrap="wrap" gap="4">
          {/* Category filters */}
          <HStack gap="2" flexWrap="wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "solid" : "outline"}
                bg={activeCategory === cat ? "fg" : "transparent"}
                color={activeCategory === cat ? "bg" : "fg.muted"}
                borderColor={activeCategory === cat ? "fg" : "border"}
                _hover={{
                  bg: activeCategory === cat ? "fg" : "bg.subtle",
                  color: activeCategory === cat ? "bg" : "fg",
                  borderColor: "fg",
                }}
                onClick={() => setActiveCategory(cat)}
                borderRadius="none"
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                {cat}
              </Button>
            ))}
          </HStack>

          {/* Sort */}
          <HStack gap="2">
            <Text fontSize="xs" color="fg.subtle" letterSpacing="wider" textTransform="uppercase" whiteSpace="nowrap">
              Sort:
            </Text>
            {(
              [
                { key: "newest", label: "Newest" },
                { key: "price-asc", label: "Price ↑" },
                { key: "price-desc", label: "Price ↓" },
              ] as { key: SortKey; label: string }[]
            ).map(({ key, label }) => (
              <Button
                key={key}
                size="sm"
                variant="ghost"
                color={sort === key ? "fg" : "fg.muted"}
                fontWeight={sort === key ? "semibold" : "normal"}
                _hover={{ color: "fg" }}
                onClick={() => setSort(key)}
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                borderRadius="none"
                borderBottom={sort === key ? "1px solid" : "none"}
                borderColor="fg"
                pb="0.5"
              >
                {label}
              </Button>
            ))}
          </HStack>
        </HStack>
      </Box>

      {/* Product count */}
      <Text fontSize="xs" color="fg.subtle" mb="6" letterSpacing="wide">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </Text>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Box textAlign="center" py="24">
          <Text color="fg.muted">No products in this category.</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap="4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
