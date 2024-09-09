
import {React, Suspense} from "react"
import JobOpenings from "./_components/JobOpenings"

const jobOpeningsMainPage=()=>{   
return(
    <Suspense>
        
    <JobOpenings/>
</Suspense>

)
}
export default jobOpeningsMainPage