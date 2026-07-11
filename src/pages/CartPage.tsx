import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Icon,
  Separator,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { LuTrash2, LuPlus, LuMinus, LuShoppingBag } from "react-icons/lu"
import { useCart } from "../context/CartContext"
import { formatCurrency } from "../lib/config"
import { buildBuyAllMessage, getWhatsAppLink } from "../lib/whatsapp"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart()
  const total = getCartTotal()

  function handleBuyAll() {
    if (items.length === 0) return
    const msg = buildBuyAllMessage(items)
    window.open(getWhatsAppLink(msg), "_blank", "noopener,noreferrer")
  }

  if (items.length === 0) {
    return (
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8" }}
        py="24"
        textAlign="center"
      >
        <VStack gap="6">
          <Icon as={LuShoppingBag} boxSize="12" color="fg.subtle" />
          <Heading fontSize="xl" fontWeight="semibold" color="fg">
            Your cart is empty
          </Heading>
          <Text color="fg.muted" fontSize="sm">
            Looks like you haven't added anything yet.
          </Text>
          <Link to="/store" style={{ textDecoration: "none" }}>
            <Button
              bg="fg"
              color="bg"
              _hover={{ bg: "fg.muted" }}
              borderRadius="none"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
              px="8"
            >
              Browse Store
            </Button>
          </Link>
        </VStack>
      </Box>
    )
  }

  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="12">
      {/* Header */}
      <HStack justify="space-between" align="baseline" mb="10">
        <VStack align="start" gap="1">
          <Text fontSize="xs" color="fg.subtle" letterSpacing="widest" textTransform="uppercase">
            Review
          </Text>
          <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" letterSpacing="tight" color="fg">
            Your Cart
          </Heading>
        </VStack>
        <Button
          variant="ghost"
          size="sm"
          color="fg.muted"
          onClick={clearCart}
          fontSize="xs"
          letterSpacing="wider"
          textTransform="uppercase"
          _hover={{ color: "fg" }}
        >
          Clear All
        </Button>
      </HStack>

      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: "8", lg: "12" }} align="start">
        {/* Items list */}
        <VStack flex="1" gap="0" align="stretch" divideY="1px" divideColor="border.subtle">
          {items.map((item) => (
            <Flex key={`${item.id}-${item.size}`} py="6" gap="4" align="start">
              {/* Image */}
              <Box
                w="20"
                h="24"
                flexShrink={0}
                overflow="hidden"
                bg="bg.muted"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  fallback={<Box w="full" h="full" bg="bg.muted" />}
                />
              </Box>

              {/* Details */}
              <Box flex="1">
                <Text fontSize="sm" fontWeight="semibold" color="fg" mb="0.5">
                  {item.name}
                </Text>
                <Text fontSize="xs" color="fg.subtle" mb="3">
                  Size: {item.size}
                </Text>

                <HStack gap="2" align="center">
                  <Button
                    size="xs"
                    variant="outline"
                    borderRadius="none"
                    borderColor="border"
                    p="0"
                    w="7"
                    h="7"
                    minW="7"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    <Icon as={LuMinus} boxSize="3" />
                  </Button>
                  <Text fontSize="sm" fontWeight="medium" color="fg" minW="6" textAlign="center">
                    {item.quantity}
                  </Text>
                  <Button
                    size="xs"
                    variant="outline"
                    borderRadius="none"
                    borderColor="border"
                    p="0"
                    w="7"
                    h="7"
                    minW="7"
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    <Icon as={LuPlus} boxSize="3" />
                  </Button>
                </HStack>
              </Box>

              {/* Price + remove */}
              <VStack align="end" gap="3">
                <Text fontSize="sm" fontWeight="bold" color="fg">
                  {formatCurrency(item.price * item.quantity)}
                </Text>
                <Button
                  size="xs"
                  variant="ghost"
                  color="fg.subtle"
                  _hover={{ color: "fg" }}
                  p="1"
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label="Remove item"
                >
                  <Icon as={LuTrash2} boxSize="4" />
                </Button>
              </VStack>
            </Flex>
          ))}
        </VStack>

        {/* Order Summary */}
        <Box
          w={{ base: "full", lg: "sm" }}
          flexShrink={0}
          border="1px solid"
          borderColor="border.subtle"
          p="6"
        >
          <Text
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="widest"
            textTransform="uppercase"
            color="fg"
            mb="6"
          >
            Order Summary
          </Text>

          <VStack gap="3" align="stretch" mb="4">
            {items.map((item) => (
              <HStack key={`${item.id}-${item.size}`} justify="space-between">
                <Text fontSize="xs" color="fg.muted" flex="1" lineClamp={1}>
                  {item.name} ×{item.quantity}
                </Text>
                <Text fontSize="xs" color="fg.muted" flexShrink={0}>
                  {formatCurrency(item.price * item.quantity)}
                </Text>
              </HStack>
            ))}
          </VStack>

          <Separator borderColor="border.subtle" mb="4" />

          <HStack justify="space-between" mb="6">
            <Text fontWeight="bold" color="fg" fontSize="sm">
              Total
            </Text>
            <Text fontWeight="black" color="fg" fontSize="lg">
              {formatCurrency(total)}
            </Text>
          </HStack>

          <Button
            w="full"
            bg="fg"
            color="bg"
            _hover={{ bg: "fg.muted" }}
            onClick={handleBuyAll}
            borderRadius="none"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
            size="lg"
          >
            Buy All via WhatsApp
          </Button>

          <Text fontSize="2xs" color="fg.subtle" textAlign="center" mt="3">
            You'll be redirected to WhatsApp to complete your order.
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
