import {
  Box,
  Text,
  Image,
  HStack,
  Button,
  VStack,
  Badge,
} from "@chakra-ui/react"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { formatCurrency, WHATSAPP_NUMBER } from "../lib/config"
import { buildBuyNowMessage, getWhatsAppLink } from "../lib/whatsapp"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
  sizes: string[]
  mostPicked: boolean
  bestSelling: boolean
  dateAdded: string
  inStock: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "")
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  function handleBuyNow() {
    const msg = buildBuyNowMessage(product.name, 1, product.price, selectedSize)
    window.open(getWhatsAppLink(msg), "_blank", "noopener,noreferrer")
  }

  return (
    <Box
      bg="bg"
      border="1px solid"
      borderColor="border.subtle"
      overflow="hidden"
      _hover={{ borderColor: "border.emphasized" }}
      transition="border-color 0.2s"
    >
      {/* Image */}
      <Box position="relative" aspectRatio="3/4" overflow="hidden" bg="bg.subtle">
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="full"
          objectFit="cover"
          _hover={{ transform: "scale(1.04)" }}
          transition="transform 0.4s ease"
          fallback={
            <Box w="full" h="full" bg="bg.muted" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="sm" color="fg.subtle">No image</Text>
            </Box>
          }
        />
        {product.bestSelling && (
          <Badge
            position="absolute"
            top="3"
            left="3"
            bg="fg"
            color="bg"
            fontSize="2xs"
            letterSpacing="wider"
            textTransform="uppercase"
            px="2"
            py="1"
            borderRadius="none"
          >
            Best Seller
          </Badge>
        )}
        {product.mostPicked && !product.bestSelling && (
          <Badge
            position="absolute"
            top="3"
            left="3"
            bg="bg"
            color="fg"
            border="1px solid"
            borderColor="border"
            fontSize="2xs"
            letterSpacing="wider"
            textTransform="uppercase"
            px="2"
            py="1"
            borderRadius="none"
          >
            Most Picked
          </Badge>
        )}
      </Box>

      {/* Info */}
      <VStack align="start" gap="3" p="4">
        <VStack align="start" gap="1">
          <Text fontSize="xs" color="fg.subtle" letterSpacing="wider" textTransform="uppercase">
            {product.category}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="fg" lineClamp={1}>
            {product.name}
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="fg">
            {formatCurrency(product.price)}
          </Text>
        </VStack>

        {/* Sizes */}
        <HStack gap="1" flexWrap="wrap">
          {product.sizes.map((size) => (
            <Box
              key={size}
              as="button"
              px="2"
              py="1"
              fontSize="xs"
              border="1px solid"
              borderColor={selectedSize === size ? "fg" : "border"}
              color={selectedSize === size ? "fg" : "fg.muted"}
              bg={selectedSize === size ? "bg.emphasized" : "bg"}
              cursor="pointer"
              _hover={{ borderColor: "fg", color: "fg" }}
              transition="all 0.15s"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Box>
          ))}
        </HStack>

        {/* Actions */}
        <VStack w="full" gap="2">
          <Button
            size="sm"
            variant="outline"
            w="full"
            onClick={handleAddToCart}
            borderColor="fg"
            color="fg"
            _hover={{ bg: "fg", color: "bg" }}
            transition="all 0.2s"
            borderRadius="none"
            fontSize="xs"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            {added ? "Added!" : "Add to Cart"}
          </Button>
          <Button
            size="sm"
            variant="solid"
            w="full"
            onClick={handleBuyNow}
            bg="fg"
            color="bg"
            _hover={{ bg: "fg.muted" }}
            transition="all 0.2s"
            borderRadius="none"
            fontSize="xs"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            Buy Now
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
