import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSendRequest from "@/util/useSendRequest.ts";
import Main from "@/components/Main/Main.tsx";
import formStyles from "@/pages/SignUp/SignUp.module.css";
import styles from "./CreateEditFood.module.css";
import Input from "@/components/Input/Input.tsx";
import TextArea from "@/components/Input/TextArea.tsx";
import Button from "@/components/Button/Button.tsx";
import useInputValidator from "@/util/useInputValidator.ts";
import { FoodCategoryType, FoodSubCategoryType, FoodType } from "@/interfaces.ts";
import Select from "@/components/Select/Select.tsx";
import SelectOption from "@/components/Select/SelectOption.tsx";
import useError from "@/util/useError.ts";
import formatMoney from "@/util/formatMoney.ts";

export default function CreateEditFood() {
    const { foodId } = useParams();

    const sendRequest = useSendRequest();
    const navigate = useNavigate();

    const [categories, setCategories] = React.useState<FoodCategoryType[]>();
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [subCategories, setSubCategories] = React.useState<FoodSubCategoryType[]>();
    const [selectedSubCategory, setSelectedSubCategory] = React.useState("");

    const nameInputState = useInputValidator();
    const priceInputState = useInputValidator();
    const descriptionInputState = useInputValidator();
    const [imageFile, setImageFile] = React.useState<File>();

    const [noFileError, setNoFileError] = useError();
    const [noCategoryError, setNoCategoryError] = useError();

    const [foodState, setFoodState] = React.useState<FoodType>();

    React.useEffect(() => {
        if (!foodId) return;

        const send = async () => {
            const res = await sendRequest<FoodType>(`food/${foodId}/`);

            if (res.isOK) {
                nameInputState.setValue(res.data.name);
                priceInputState.setValue(res.data.price.toString());
                descriptionInputState.setValue(res.data.description || "");
                setSelectedCategory(res.data.category.toString());
                setSelectedSubCategory(res.data.sub_category.toString());
                setFoodState(res.data);
            }
        };

        send();
    }, []);

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<FoodCategoryType[]>("food/category");

            if (res.isOK) {
                setCategories(res.data);
            }
        };
        send();
    }, []);
    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<FoodSubCategoryType[]>(
                `food/sub-category/${selectedCategory}/`,
            );

            if (res.isOK) {
                setSubCategories(res.data);
            }
        };

        if (selectedCategory) send();
    }, [selectedCategory]);

    const imageChangeHandler: React.ChangeEventHandler = (event) => {
        if (
            !(event.target as HTMLInputElement).files ||
            (event.target as HTMLInputElement).files!.length === 0
        ) {
            setImageFile(undefined);
            return;
        }
        setImageFile((event.target as HTMLInputElement).files![0]);
    };

    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        if (!(nameInputState.getIsValid() && descriptionInputState.getIsValid())) {
            return;
        }

        if (!foodState && !imageFile) {
            setNoFileError(true);
            return;
        }
        if (!selectedSubCategory) {
            setNoCategoryError(true);
            return;
        }

        const body = new FormData();
        if (!foodState || foodState.name !== nameInputState.value)
            body.append("name", nameInputState.value);

        if (!foodState || imageFile) body.append("image", imageFile!);

        if (!foodState || foodState.description !== descriptionInputState.value)
            body.append("description", descriptionInputState.value);

        if (!foodState || foodState.price.toString() !== priceInputState.value)
            body.append("price", priceInputState.value);

        if (!foodState || foodState.category !== +selectedCategory)
            body.append("category", selectedCategory);

        if (!foodState || foodState.sub_category !== +selectedSubCategory)
            body.append("sub_category", selectedSubCategory);

        const send = async () => {
            const res = await sendRequest(foodState ? `food/update/${foodId}/` : "food/create/", {
                options: {
                    method: foodState ? "PATCH" : "POST",
                    body: body,
                },
                isJSON: false,
            });

            if (res.isOK) {
                navigate("/home");
            }
        };

        send();
    };

    return (
        <Main>
            <form onSubmit={formSubmitHandler} className={formStyles.container}>
                <Input label={"عنوان غذا"} {...nameInputState.props} />
                <TextArea label={"توضیحات"} {...descriptionInputState.props} rows={5} />
                <Input
                    label={"قیمت"}
                    {...priceInputState.props}
                    type={"number"}
                    dir={"ltr"}
                    className={"numberInput"}
                />
                {priceInputState.value && <p>{formatMoney(+priceInputState.value)}</p>}
                {foodState && (
                    <img
                        src={foodState.image}
                        alt=''
                        style={{ objectFit: "contain", maxWidth: "300px", borderRadius: "30px" }}
                    />
                )}
                {foodState && <p>برای جایگزینی عکس، فایل جدید انتخاب کنید</p>}
                <input
                    type='file'
                    onChange={imageChangeHandler}
                    className={styles.fileInput}
                    accept='image/*'
                />
                {noFileError && <p style={{ color: "red" }}>فایل عکس انتخاب شود</p>}
                <Select
                    label={"دسته بندی اصلی"}
                    selectedValue={selectedCategory}
                    setValue={setSelectedCategory}
                    style={{ marginBottom: "1rem" }}
                >
                    <SelectOption value={""}>-----</SelectOption>
                    {categories &&
                        categories.map((category) => (
                            <SelectOption key={category.id} value={category.id}>
                                {category.name}
                            </SelectOption>
                        ))}
                </Select>
                <Select
                    label={"دسته بندی فرعی"}
                    selectedValue={selectedSubCategory}
                    setValue={setSelectedSubCategory}
                    style={{ marginBottom: "1rem" }}
                >
                    <SelectOption value={""}>-----</SelectOption>
                    {subCategories &&
                        subCategories.map((subCategory) => (
                            <SelectOption key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                            </SelectOption>
                        ))}
                </Select>
                {noCategoryError && <p style={{ color: "red" }}>دسته بندی مشخص شود</p>}
                <Button
                    type={"submit"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
                >
                    ثبت
                </Button>
            </form>
        </Main>
    );
}
