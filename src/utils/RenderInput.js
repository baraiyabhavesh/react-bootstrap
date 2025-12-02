import React from "react";
import InputGroup from "@/components/Core/InputGroup";
import { Row, Col } from "react-bootstrap";
const RenderInputs = ({ elementsList, layoutType, registerField, errors, setError, setValue, clearErrors }) => {
	let XXLColSize, XLColSize, LGColSize, MDColSize, SMColSize, XSColSize;
	return elementsList.map((element, id) => {
		// const {label, elements } = element;
		const { label, name, properties, defaultValue, identifier, elements, validators } = element;
		const type = element.type.toLowerCase();
		if (type === "gridrow") {
			return (
				<React.Fragment key={id}>
					<Row className="form-row">
						{elements && elements.length && elements.map(
							({ label, name, properties, type, defaultValue, identifier, validators }, index) => {
								XXLColSize = properties && properties.gridColumnClassAutoConfiguration && properties.gridColumnClassAutoConfiguration.viewPorts && properties.gridColumnClassAutoConfiguration.viewPorts.xxl && properties.gridColumnClassAutoConfiguration.viewPorts.xxl.numbersOfColumnsToUse;
								XLColSize = properties && properties.gridColumnClassAutoConfiguration && properties.gridColumnClassAutoConfiguration.viewPorts && properties.gridColumnClassAutoConfiguration.viewPorts.xl && properties.gridColumnClassAutoConfiguration.viewPorts.xl.numbersOfColumnsToUse
								LGColSize = properties && properties.gridColumnClassAutoConfiguration && properties.gridColumnClassAutoConfiguration.viewPorts && properties.gridColumnClassAutoConfiguration.viewPorts.lg && properties.gridColumnClassAutoConfiguration.viewPorts.lg.numbersOfColumnsToUse
								MDColSize = properties && properties.gridColumnClassAutoConfiguration && properties.gridColumnClassAutoConfiguration.viewPorts && properties.gridColumnClassAutoConfiguration.viewPorts.md && properties.gridColumnClassAutoConfiguration.viewPorts.md.numbersOfColumnsToUse
								SMColSize = properties && properties.gridColumnClassAutoConfiguration && properties.gridColumnClassAutoConfiguration.viewPorts && properties.gridColumnClassAutoConfiguration.viewPorts.sm && properties.gridColumnClassAutoConfiguration.viewPorts.sm.numbersOfColumnsToUse;
								XSColSize = properties && properties.gridColumnClassAutoConfiguration && properties.gridColumnClassAutoConfiguration.viewPorts && properties.gridColumnClassAutoConfiguration.viewPorts.xs && properties.gridColumnClassAutoConfiguration.viewPorts.xs.numbersOfColumnsToUse
								return (
									<Col xs={XSColSize} sm={SMColSize} md={MDColSize} lg={LGColSize} xl={XLColSize} xxl={XXLColSize} className="col" key={index}>
										<InputGroup
											label={label}
											name={name}
											type={type.toLowerCase()}
											defaultValue={defaultValue ? defaultValue : ""}
											errors={errors}
											identifier={identifier}
											data={properties}
											layoutType={layoutType}
											register={registerField}
											validation={validators}
											setError={setError}
											setValue={setValue}
											clearErrors={clearErrors}
										/>
									</Col>
								);
							}
						)}
					</Row>
				</React.Fragment>
			);
		} else if (type === "fieldset") {
			return (
				<fieldset key={id}>
					<legend>{label}</legend>
					{elements && elements.length && elements.map(({ label, name, type }, index) => {
						return (
							<React.Fragment key={index}>
								<InputGroup
									label={label}
									name={name}
									type={type.toLowerCase()}
									register={registerField}
									defaultValue={defaultValue ? defaultValue : ""}
									errors={errors}
									identifier={identifier}
									data={properties}
									validation={validators}
									setError={setError}
									setValue={setValue}
									clearErrors={clearErrors}
								/>
							</React.Fragment>
						)
					})}
				</fieldset>
			)
		} else {
			if (
				type === "fileupload" ||
				type === "text" ||
				type === "textarea" ||
				type === "password" ||
				type === "email" ||
				type === "telephone" ||
				type === "url" ||
				type === "number" ||
				type === "date" ||
				type === "checkbox" ||
				type === "singleselect" ||
				type === "radiobutton" ||
				type === "multicheckbox" ||
				type === "multiselect" ||
				type === "imageupload" ||
				type === "advancedpassword" ||
				type === "statictext"
			) {
				return (
					<React.Fragment key={id}>
						<InputGroup
							label={label}
							name={name}
							type={type.toLowerCase()}
							register={registerField}
							defaultValue={defaultValue ? defaultValue : ""}
							errors={errors}
							identifier={identifier}
							data={properties}
							validation={validators}
							setError={setError}
							setValue={setValue}
							clearErrors={clearErrors}
						/>
					</React.Fragment>
				)
			}
		}
	});
};
export default RenderInputs;