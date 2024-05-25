import { getTag } from '@/backend/database/tags';
import { currentUser } from "@clerk/nextjs/server";
import {logForm} from '@/backend/validation/form'
import CreateLogForm from '@/components/forms/createLogForm';

export default async function Page() {

    const user = await currentUser()
    if(!user) return null;

    console.log(user?.id)

    const listOfTags = await getTag()
    //console.log(listOfTags)
    
    return (
            <CreateLogForm userId={user?.id} tags={listOfTags}/>
    );
}
