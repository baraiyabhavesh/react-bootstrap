"use client";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import RenderInputs from "@/utils/RenderInput";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const FormPage = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const router = useRouter();
  const { form, link, form_additional } = data;

  const t = useTranslations()

  const [values, setValues] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm();

  const submitData = (values) => {
    const { tx_form_formframework } = values;
    const availableData = Object.values(tx_form_formframework)[0];
    Object.entries(availableData).map((items) => {
      form.elements.map((item) => {
        if (items[0] === item.identifier) {
          item.validators?.map((data) => {
            if (data.options) {
              if (
                items[1].length >= Number(data.options?.minimum) &&
                items[1].length <= Number(data.options?.maximum)
              ) {
              } else {
                setError(item.identifier, {
                    message: `${t("selected_value_not_more_than")} ${
                      data.options.maximum
                    } ${t("or_less_than")} ${data.options.minimum}`,
                
                });
              }
            }
          });
        }
      });
    });
    if (errors) {
      let redirectLink;
      form_additional &&
        form_additional.finishers &&
        form_additional.finishers.length > 0 &&
        form_additional.finishers.map((finisher) => {
          finisher.identifier === "Redirect"
            ? (redirectLink = finisher.link)
            : "";
        });
      router.push(`${redirectLink}`);
    }
  };
  return (
    <div
      className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Form onSubmit={handleSubmit(submitData)} noValidate>
        <RenderInputs
          elementsList={form.elements}
          registerField={register}
          values={values}
          setValues={setValues}
          errors={errors}
          setError={setError}
          setValue={setValue}
          clearErrors={clearErrors}
          customError={form_additional.renderables[0]}
        />
        {form_additional &&
          form_additional.renderingOptions &&
          form_additional.renderingOptions.submitButtonLabel && (
            <div className="actions">
              <nav className="form-navigation">
                <div className="btn-toolbar" role="toolbar">
                  <div className="btn-group" role="group">
                    <span className="btn-group next submit">
                      <Button className="btn btn-primary" type="submit">
                        {form_additional.renderingOptions.submitButtonLabel}
                      </Button>
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          )}
      </Form>
    </div>
  );
};
export default FormPage;
