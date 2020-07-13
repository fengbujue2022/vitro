import {
    Stack,
    Box,
    StackProps,
    InputGroup,
    InputLeftElement,
    Icon,
    Input,
    InputGroupProps,
    useColorMode,
    IconButton,
} from '@chakra-ui/core'
import { AiFillCaretRight } from 'react-icons/ai'
import { BsGrid1X2Fill as LogoPart } from 'react-icons/bs'
import NextLink from 'next/link'
import { getStories } from '../support'
import { useMemo, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

export const StoriesIndex = ({ ...p }: Omit<InputGroupProps, 'children'>) => {
    let [filter, setFilter] = useState('')
    filter = filter.toLowerCase()
    const throttledSetFilter = useCallback<any>(debounce(setFilter, 100), [
        setFilter,
    ])
    const { colorMode, toggleColorMode } = useColorMode()
    const stories = useMemo(() => getStories(), [])
    return (
        <Stack spacing='6' {...p}>
            <Stack direction='row' spacing='2' align='center'>
                <Logo />
                <Box flex='1' />
                <IconButton
                    // bg={{ light: 'white', dark: 'gray.700' }[colorMode]}
                    // size='sm'
                    // shadow='sm'
                    onClick={toggleColorMode}
                    fontSize='1.2em'
                    aria-label='color-mode-toggle'
                    icon={colorMode === 'dark' ? 'moon' : 'sun'}
                />
            </Stack>
            <InputGroup shadow='sm'>
                <InputLeftElement
                    children={<Icon name='search' color='gray.400' />}
                />
                <Input
                    onChange={(e) => throttledSetFilter(e?.target?.value)}
                    variant='filled'
                    bg={{ light: 'white', dark: 'gray.700' }[colorMode]}
                    borderRadius='md'
                />
            </InputGroup>
            <Stack spacing='4'>
                {stories.map(({ title, filename }) => {
                    if (
                        filter &&
                        !title.toLowerCase().includes(filter) &&
                        !filename.toLowerCase().includes(filter)
                    ) {
                        return null
                    }
                    return (
                        <Box key={filename}>
                            <NextLink
                                passHref
                                href={`/stories/${filename}`}
                                // href={`/stories/[...story]`}
                            >
                                <Stack
                                    cursor='pointer'
                                    align='center'
                                    direction='row'
                                >
                                    <Box
                                        as={AiFillCaretRight}
                                        opacity={0.6}
                                        size='0.9em'
                                    />
                                    <Box as='a'>{title}</Box>
                                </Stack>
                            </NextLink>
                        </Box>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export const Logo = ({ ...rest }) => {
    return (
        <Stack
            direction='row'
            align='baseline'
            fontSize='24px'
            fontWeight='500'
            spacing='3'
            {...rest}
        >
            <Box as={Beaker} size='1.6em' />
            <Box letterSpacing='0.08em' fontSize='1.6em'>
                Vitro
            </Box>
        </Stack>
    )
}

const Beaker = ({ ...rest }) => {
    return (
        <svg viewBox='0 0 73 74' version='1.1' {...rest}>
            <title>BeakerLogo</title>
            <desc>Created with Sketch.</desc>
            <g
                id='Page-1'
                stroke='none'
                stroke-width='1'
                fill='none'
                fill-rule='evenodd'
            >
                <g
                    id='Desktop-HD'
                    transform='translate(-1253.000000, -683.000000)'
                >
                    <g
                        id='BeakerLogo'
                        transform='translate(1256.000000, 685.000000)'
                    >
                        <path
                            d='M7.10699457,2.96165066 L7.10699457,63.5079402 C7.10699457,66.269364 9.34557082,68.5079402 12.1069946,68.5079402 L54.7969833,68.5079402 C57.5584071,68.5079402 59.7969833,66.269364 59.7969833,63.5079402 L59.7969833,2.96165066 L59.7969833,2.96165066'
                            id='Path-2'
                            stroke='currentColor'
                            stroke-width='5'
                        ></path>
                        <path
                            d='M58.5,31.5 L58.5,67.5 L8.5,67.5 L8.5,31.5 L58.5,31.5 Z M39,45.5 C35.9624339,45.5 33.5,47.9624339 33.5,51 C33.5,54.0375661 35.9624339,56.5 39,56.5 C42.0375661,56.5 44.5,54.0375661 44.5,51 C44.5,47.9624339 42.0375661,45.5 39,45.5 Z M25,47.5 C23.0670034,47.5 21.5,49.0670034 21.5,51 C21.5,52.9329966 23.0670034,54.5 25,54.5 C26.9329966,54.5 28.5,52.9329966 28.5,51 C28.5,49.0670034 26.9329966,47.5 25,47.5 Z'
                            id='Combined-Shape'
                            fill='currentColor'
                        ></path>
                        <line
                            x1='67'
                            y1='1'
                            x2='0'
                            y2='1'
                            id='Line-Copy-2'
                            stroke='currentColor'
                            stroke-width='5'
                            stroke-linecap='round'
                        ></line>
                        <line
                            x1='28'
                            y1='11'
                            x2='19'
                            y2='11'
                            id='Line'
                            stroke='currentColor'
                            stroke-width='5'
                            stroke-linecap='round'
                        ></line>
                        <line
                            x1='28'
                            y1='21'
                            x2='19'
                            y2='21'
                            id='Line-Copy'
                            stroke='currentColor'
                            stroke-width='5'
                            stroke-linecap='round'
                        ></line>
                    </g>
                </g>
            </g>
        </svg>
    )
}
