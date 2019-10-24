import React from "react"
import { Box, Text, styled, Flex, FlexItem } from "looker-lens"

export const MetadataList = styled.div``

export const MetadataItem = ({
  aux,
  label,
  children,
  compact
}: {
  label: string
  aux?: string
  children: React.ReactNode
  compact?: boolean
}) => {
  if (compact) {
    return (
      <Flex my="large">
        <FlexItem>
          <Text fontSize="small" fontWeight="bold" flex="0 0 auto">
            {label}
          </Text>
        </FlexItem>
        <FlexItem textAlign="right" flex="1 1 auto">
          <Text fontSize="small">{children}</Text>
        </FlexItem>
      </Flex>
    )
  } else {
    return (
      <Box my="large">
        <Box>
          <Flex my="large">
            <FlexItem>
              <Text fontSize="small" fontWeight="bold" flex="0 0 auto">
                {label}
              </Text>
            </FlexItem>
            {aux && (
              <FlexItem textAlign="right" flex="1 1 auto">
                <Text fontSize="small" variant="subdued">
                  {aux}
                </Text>
              </FlexItem>
            )}
          </Flex>
        </Box>
        <Box>
          <Text fontSize="small">{children}</Text>
        </Box>
      </Box>
    )
  }
}
