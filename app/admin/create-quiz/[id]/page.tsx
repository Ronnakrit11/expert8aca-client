import React from 'react'
import QuizDetailContainner from '../components/QuizDetailContainner'

const page = ({ params }) => {
    console.log("🚀 ~ page ~ params:", params)
    return (
        <div>
            <QuizDetailContainner quizId={params.id} />
        </div>
    )
}

export default page