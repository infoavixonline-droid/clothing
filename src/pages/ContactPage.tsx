import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useState } from "react"
import { LuMapPin, LuMail, LuPhone, LuSend } from "react-icons/lu"
import { WHATSAPP_NUMBER } from "../lib/config"
import { getWhatsAppLink } from "../lib/whatsapp"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hi! I have a query:\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.open(getWhatsAppLink(text), "_blank", "noopener,noreferrer")
    setSubmitted(true)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="16">
      {/* Header */}
      <VStack align="start" gap="2" mb="16">
        <Text fontSize="xs" color="fg.subtle" letterSpacing="widest" textTransform="uppercase">
          Get In Touch
        </Text>
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" letterSpacing="tight" color="fg">
          We'd love to hear from you.
        </Heading>
        <Text color="fg.muted" fontSize="sm" maxW="md">
          Have a question about sizing, an order, or just want to chat about style? Reach out — we're here.
        </Text>
      </VStack>

      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: "12", lg: "16" }}>
        {/* Contact form */}
        <Box flex="1" maxW={{ lg: "xl" }}>
          <Box
            as="form"
            onSubmit={handleSubmit}
          >
            <VStack gap="5" align="start">
              <Field label="Name" required>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  borderRadius="none"
                  borderColor="border"
                  _focus={{ borderColor: "fg", boxShadow: "none" }}
                  size="md"
                />
              </Field>
              <Field label="Email" required>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  borderRadius="none"
                  borderColor="border"
                  _focus={{ borderColor: "fg", boxShadow: "none" }}
                  size="md"
                />
              </Field>
              <Field label="Message" required>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us how we can help..."
                  required
                  rows={5}
                  borderRadius="none"
                  borderColor="border"
                  _focus={{ borderColor: "fg", boxShadow: "none" }}
                  resize="vertical"
                />
              </Field>

              {submitted && (
                <Box
                  w="full"
                  p="4"
                  bg="bg.subtle"
                  border="1px solid"
                  borderColor="border"
                >
                  <Text fontSize="sm" color="fg.muted">
                    Opening WhatsApp with your message. We'll reply shortly!
                  </Text>
                </Box>
              )}

              <Button
                type="submit"
                bg="fg"
                color="bg"
                _hover={{ bg: "fg.muted" }}
                borderRadius="none"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
                px="8"
                size="lg"
              >
                <Icon as={LuSend} mr="2" />
                Send via WhatsApp
              </Button>
            </VStack>
          </Box>
        </Box>

        {/* Contact details */}
        <Box flex="1">
          <SimpleGrid columns={1} gap="8">
            <ContactDetail
              icon={LuPhone}
              label="WhatsApp"
              value={`+${WHATSAPP_NUMBER}`}
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
            />
            <ContactDetail
              icon={LuMail}
              label="Email"
              value="hello@moda.lk"
              href="mailto:hello@moda.lk"
            />
            <ContactDetail
              icon={LuMapPin}
              label="Address"
              value="123 Galle Road, Colombo 03, Sri Lanka"
            />
          </SimpleGrid>

          <Box
            mt="10"
            h="56"
            bg="bg.muted"
            border="1px solid"
            borderColor="border.subtle"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=79.84,6.88,79.90,6.94&layer=mapnik"
              width="100%"
              height="100%"
              style={{ border: 0 }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  return (
    <HStack align="start" gap="4">
      <Box
        p="3"
        border="1px solid"
        borderColor="border.subtle"
        flexShrink={0}
      >
        <Icon as={icon} boxSize="4" color="fg" />
      </Box>
      <VStack align="start" gap="0.5">
        <Text fontSize="xs" color="fg.subtle" letterSpacing="wider" textTransform="uppercase">
          {label}
        </Text>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <Text fontSize="sm" color="fg.muted" _hover={{ color: "fg" }} transition="color 0.15s">
              {value}
            </Text>
          </a>
        ) : (
          <Text fontSize="sm" color="fg.muted">{value}</Text>
        )}
      </VStack>
    </HStack>
  )
}
