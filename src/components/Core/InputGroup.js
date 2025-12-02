import { useTranslations } from "next-intl";
import { safeIncludes } from "@/utils/safeString";

const InputGroup = ({
  label,
  name,
  type,
  register,
  defaultValue,
  layoutType,
  rules,
  errors,
  identifier,
  data,
  validation,
  setError,
  setValue,
  clearErrors,
}) => {
  const {
    fluidAdditionalAttributes,
    allowedMimeTypes,
    elementDescription,
    options,
    text,
    confirmationLabel,
  } = data;
  const { required, placeholder, minlength, maxlength } =
    fluidAdditionalAttributes || "";
  const t = useTranslations();

  const { tx_form_formframework } = errors;

  const availableData =
    tx_form_formframework && Object.values(tx_form_formframework)[0];

  const checkValidation = (name) => {
    validation.map((item) => {
      if (item.identifier !== "NotEmpty") {
        var fileData = document.getElementById(`${name}`);

        if (fileData.files[0].type !== allowedMimeTypes[0]) {
          setError(name, {
            message: `${t("accept_only")} ${allowedMimeTypes[0]}`,
            message: `Accept only ${allowedMimeTypes[0]}`,
          });
        } else {
          if (
            fileData.files[0].size / (1024 * 1024) >
            String(item.options.maximum)
              .replace(/B/g, "")
              .replace(/K/g, "")
              .replace(/M/g, "")
              .replace(/G/g, "")
          ) {
            setError(name, {
              message: `${t("file_size_is_more_than")} ${item.options.maximum}`,
            });
          } else if (
            fileData.files[0].size / (1024 * 1024) <
            String(item.options.minimum)
              .replace(/B/g, "")
              .replace(/K/g, "")
              .replace(/M/g, "")
              .replace(/G/g, "")
          ) {
            setError(name, {
              message: `${t("file_size_is_less_than")} ${item.options.minimum}`,
            });
          } else {
            clearErrors(`${name}`);
            setValue(name, fileData.files[0]);
          }
        }
      }
    });
  };

  return (
    <>
      <div
        className={`form-group ${
          layoutType === "layout-3" ? "position-relative" : ""
        } ${type === "hidden" ? "d-none" : ""}`}
      >
        {type !== "radiobutton" &&
        type !== "checkbox" &&
        type !== "multicheckbox" ? (
          label ? (
            <label className="control-label" htmlFor={`${name}`}>
              {label}
              {required ? <span className="required"> *</span> : null}
            </label>
          ) : (
            <label className="sr-only">
              {required ? <span className="required"> *</span> : null}
            </label>
          )
        ) : (
          <div
            className={`${
              type !== "checkbox"
                ? "custom-radio-multiple"
                : "custom-control custom-checkbox"
            }`}
          >
            {label ? (
              type === "checkbox" || type === "multicheckbox" ? (
                <>
                  {options ? (
                    <>
                      <label>{label}</label>
                      {Object.values(options).map((item, index) => (
                        <div className="form-check" key={index}>
                          <input
                            type="checkbox"
                            className="custom-control-input form-check-input"
                            id={`${name}`}
                            required={required}
                            defaultChecked={safeIncludes(defaultValue, item.toLowerCase())}
                          />
                          <label
                            className="custom-control-input form-check-label"
                            htmlFor={`${name}`}
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                      {elementDescription && (
                        <figcaption>{elementDescription}</figcaption>
                      )}
                      {availableData && availableData[identifier] && (
                        <span
                          className={`error help-block ${
                            layoutType === "layout-3" ? "invalid-tooltip" : ""
                          }`}
                          role="alert"
                        >
                          {availableData[identifier]?.message}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="form-check">
                        <input
                          required={required}
                          className="custom-control-input form-check-input"
                          id={`${name}`}
                          type={type}
                          name={name}
                          {...(register &&
                            register(name, {
                              required: required
                                ? `${t("agree_condition_error")}`
                                : null,
                            }))}
                          value="1"
                        />
                        <label
                          className="custom-control-input form-check-label"
                          htmlFor={`${name}`}
                        >
                          {label}
                          {required ? (
                            <span className="required"> *</span>
                          ) : null}
                        </label>
                      </div>
                      {elementDescription && (
                        <figcaption>{elementDescription}</figcaption>
                      )}
                      {availableData && availableData[identifier] && (
                        <span
                          className={`error help-block ${
                            layoutType === "layout-3" ? "invalid-tooltip" : ""
                          }`}
                          role="alert"
                        >
                          {availableData[identifier]?.message}
                        </span>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <label className="control-label" htmlFor={`${name}`}>
                    {label}
                    {required ? <span className="required"> *</span> : null}
                  </label>
                  <div className="custom-radio-multiple">
                    <div id={`${name}`} className="inputs-list">
                      {options &&
                        Object.values(options).map((item, index) => {
                          return (
                            <div key={index} className="form-check">
                              <input
                                className="custom-control-input form-check-input"
                                type="radio"
                                id={`${name}`}
                                name={name}
                                value={item}
                                defaultChecked={
                                  item.toLowerCase() ===
                                  defaultValue.toLowerCase()
                                    ? true
                                    : false
                                }
                                {...(register &&
                                  register(name, {
                                    required: required
                                      ? `${t("this_field_is_required")}`
                                      : null,
                                  }))}
                              />
                              <label htmlFor={`${name}`}>{item}</label>
                            </div>
                          );
                        })}
                    </div>
                    {elementDescription && (
                      <figcaption>{elementDescription}</figcaption>
                    )}
                    {availableData && availableData[identifier] && (
                      <span
                        className={`error help-block ${
                          layoutType === "layout-3" ? "invalid-tooltip" : ""
                        }`}
                        role="alert"
                      >
                        {availableData[identifier]?.message}
                      </span>
                    )}
                  </div>
                </>
              )
            ) : (
              <label className="sr-only">
                {required ? <span className="required"> *</span> : null}
              </label>
            )}
          </div>
        )}

        {type !== "radiobutton" &&
          type !== "checkbox" &&
          type !== "multicheckbox" && (
            <div className="input">
              {type === "textarea" && (
                <>
                  <textarea
                    className="xxlarge form-control"
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,
                      }))}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "password" && (
                <>
                  <input
                    className="form-control"
                    type={`${type}`}
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,

                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `${t("value_is_not_valid")}`,
                        },
                      }))}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "text" && (
                <>
                  <input
                    className="form-control"
                    type={`${type}`}
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,

                        min: {
                          value: minlength,
                          message: `${t("minimum_value")} ${minlength}`,
                        },
                        max: {
                          value: maxlength,
                          message: `${t("maximum_value")} ${maxlength}`,
                        },
                      }))}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "statictext" && (
                <>
                  <input
                    className="form-control"
                    type="text"
                    id={`${name}`}
                    name={name}
                    defaultValue={text}
                    readOnly
                  />
                </>
              )}

              {type === "advancedpassword" && (
                <>
                  <input
                    className="form-control"
                    type="password"
                    id={`${name}`}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,
                      }))}
                  />
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                  <label className="control-label d-block" htmlFor={`${name}`}>
                    {confirmationLabel}
                    {required ? <span className="required"> *</span> : null}
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id={`${name}`}
                    name="confirm_password"
                    placeholder={placeholder}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "telephone" && (
                <>
                  <input
                    className="form-control"
                    type="tel"
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,

                        pattern: {
                          value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
                          message: `${t("phone_number_is_not_valid")}`,
                        },
                      }))}
                    onKeyDown={(e) => {
                      let reg = /^[0-9 ]/i;
                      if (
                        !reg.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "email" && (
                <>
                  <input
                    className="form-control"
                    type={`${type}`}
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,

                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: `${t("please_enter_valid_email")}`,
                        },
                      }))}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {(type === "imageupload" || type === "fileupload") && (
                <>
                  <input
                    type="file"
                    className={`custom-file-input ${
                      availableData && availableData[identifier]
                        ? "error invalid-feedback"
                        : ""
                    }`}
                    id={`${name}`}
                    name={name}
                    required={required}
                    accept={allowedMimeTypes[0]}
                    onChange={() => checkValidation(name)}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("file_upload_required")}`
                          : null,
                      }))}
                  />
                  {elementDescription && (
                    <p>
                      <span>{elementDescription}</span>
                    </p>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "url" && (
                <>
                  <input
                    className="form-control"
                    type={`${type}`}
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,

                        pattern: {
                          value:
                            /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                          message: `${t("please_enter_valid_url")}`,
                        },
                      }))}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {(type === "number" || type === "date") && (
                <>
                  <input
                    className="form-control"
                    type={`${type}`}
                    id={`${name}`}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,

                        min: {
                          value: minlength,
                          message: `${t("minimum_value")} ${minlength}`,
                        },
                        max: {
                          value: maxlength,
                          message: `${t("maximum_value")} ${maxlength}`,
                        },
                      }))}
                  />
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {availableData && availableData[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {availableData[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {(type === "singleselect" || type === "multiselect") && (
                <>
                  <select
                    className="custom-select form-control"
                    id={`${name}`}
                    {...(register &&
                      register(name, {
                        required: required
                          ? `${t("this_field_is_required")}`
                          : null,
                      }))}
                    name={name}
                    multiple={type === "multiselect" ? true : false}
                    onChange={() => clearErrors(`${identifier}`)}
                  >
                    {options &&
                      Object.values(options).map((option, index) => {
                        return (
                          <option
                            key={index}
                            value={option}
                            selected={
                              type === "singleselect"
                                ? option.toLowerCase() ===
                                  (defaultValue || "").toLowerCase()
                                : safeIncludes(defaultValue, option.toLowerCase())
                            }
                          >
                            {option}
                          </option>
                        );
                      })}
                  </select>
                  {elementDescription && (
                    <figcaption>{elementDescription}</figcaption>
                  )}
                  {errors && errors[identifier] && (
                    <span
                      className={`error help-block ${
                        layoutType === "layout-3" ? "invalid-tooltip" : ""
                      }`}
                      role="alert"
                    >
                      {errors[identifier]?.message}
                    </span>
                  )}
                </>
              )}

              {type === "hidden" && (
                <label hidden={true} htmlFor={name} defaultValue={defaultValue}>
                  {label}
                </label>
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default InputGroup;
