
export const ProfileAvatar = (props:{name: string}) => {
    const nameParts = props.name.split(' ')
    const firstLetter = nameParts[0] ? nameParts[0][0] : ''
    const secondLetter = nameParts[1] ? nameParts[1][0] : ''
    return (
        <div className='mx-auto text-center flex flex-col items-center justify-center bg-dark-cayn w-20 h-20
        rounded-full text-xl mt-6'>
            {firstLetter} {secondLetter}

        </div>
    )
}