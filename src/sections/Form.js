import dynamic from "next/dynamic";

const Form1 = dynamic(()=>import("@/components/Form/defaultForm"),{
	ssr:false,
});

const Form2 = dynamic(()=>import("@/components/Form/validationTooltipForm"),{
	ssr:false,
});

const Form3 = dynamic(()=>import("@/components/Form/validationForm"),{
	ssr:false,
});

const FormVariation = ({data,spaceAfter,spaceBefore,layoutType,elementType}) => {

	const FormMapping = {
		default: Form1,
		layout_2:Form2,
		layout_3:Form3,
	};

	const FormComponent = FormMapping[layoutType.replace("-","_")];
	return(
		<>
		{FormComponent && (
			<FormComponent
				data={data}
				spaceAfter={spaceAfter}
				spaceBefore={spaceBefore}
				layoutType={layoutType}
				elementType={elementType}
			/>
		)}
		</>
	)
};
export default FormVariation;