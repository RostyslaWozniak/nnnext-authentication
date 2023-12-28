export default function UserProfile({ params } : any ){
    return(
        <div className="flex flex-col items-center">
            <h1>Profile</h1>
            
            <p className="text-4xl">Profile page 
                <span className="px-2 py-1 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
        </div>
    )
}