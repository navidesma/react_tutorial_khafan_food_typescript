import { UserTypeEnum } from "@/interfaces.ts";

export default function formatUser(userType: UserTypeEnum) {
    if (userType === UserTypeEnum.NORMAL_USER) return "کاربر عادی";

    return "کاربر رستوران";
}
