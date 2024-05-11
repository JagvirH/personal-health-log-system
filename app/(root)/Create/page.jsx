import { getTag } from '@/backend/database/tags';

import {logForm} from '@/backend/validation/form'
import CreateLogForm from '@/components/forms/createLogForm';

export default function Page() {
    
    return (
            <CreateLogForm />
    );
}
