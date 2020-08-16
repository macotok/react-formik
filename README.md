# react-formik

YouTube チャンネル [CodeEvolution](https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw)の「React Formik」を参考

## set up

```
$ npm i formik
```

## useFormik を使って form 実装 Basic 編

useFormik で実装すること

- form の各 value の値を管理
- handling submit
- validate

form の HTML

```
<div>
  <form>
    <label htmlFor="name">Name</label>
    <input type="text" id="name" name="name" />

    <label htmlFor="email">E-mail</label>
    <input type="email" id="email" name="email" />

    <label htmlFor="channel">Channel</label>
    <input type="text" id="channel" name="channel" />

    <button>Submit</button>
  </form>
</div>
```

### form の各 value の値を管理

- useFormik 関数を変数(formik)で管理
- formik.values で各要素の value を管理
- useFormik 関数の object に`initialValues`を設定して、各 form 要素の初期値を管理
- initialValues の key 名は form 要素の`name`の値
- onChage 属性に useFormik の API`handleChange`を指定。`onChange={formik.handleChange}`で`formik.values`で設定した name を key としたデータが入る
- value 属性に useFormik の API`values`を指定。`value={formik.values.{name名}}`で`formik.values`で設定した name のデータが表示される

```
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: {
    name: '',
    email: '',
    channel: '',
  },
});
```

```
<input
  type="text"
  id="name"
  name="name"
  onChange={formik.handleChange}
  value={formik.values.name}
/>
```

完成形

```
import React from 'react';
import { useFormik } from 'formik';

function YoutubeForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      channel: '',
    },
  });

  console.log('form valuse', formik.values);

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          value={formik.values.channel}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
```

### submit ボタンを押下して form data を取得

- form タグの`onSubmit属性`に useFormik の API`handleSubmit`を指定。`onSubmit={formik.handleSubmit}`
- button タグの type を`submit`にする
- `useFormik`関数の object に`onSubmit`メソッドを記述して form の各要素の value を取得

```
const formik = useFormik({
  onSubmit: (values) => {
    console.log('form data', values);
  },
});
```

```
<form onSubmit={formik.handleSubmit}>
```

```
<button type="submit">Submit</button>
```

完成形

```
import React from 'react';
import { useFormik } from 'formik';

function YoutubeForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      channel: '',
    },
    onSubmit: (values) => {
      console.log('form data', values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          value={formik.values.channel}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
```

### validate 実装

- useFormik 関数に validate メソッドを指定
- validate メソッドには`errors`を戻り値とする
- validate メソッドの引数`values`には各要素の name の値を key とした value が入る
- `formik.errors`で各要素のエラーメッセージを取得

```
const formik = useFormik({
  validate: (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = 'Name is Required';
    }

    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.channel) {
      errors.channel = 'Channel is Required';
    }

    return errors;
  }
});
```

```
{formik.errors.name ? (
  <div className="error">{formik.errors.name}</div>
) : null}
```

完成形

```
import React from 'react';
import { useFormik } from 'formik';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};

const onSubmit = (values) => {
  console.log('form data', values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is Required';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.channel) {
    errors.channel = 'Channel is Required';
  }

  return errors;
};

function YoutubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            value={formik.values.channel}
          />
          {formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;

```

### validate 選択項目のみエラーメッセージを表示

- ユーザーが touch した項目のみ validate を検知
- handleBlur したときにエラーメッセージ表示

```
<input
  onBlur={formik.handleBlur}
/>
```

```
{formik.touched.name && formik.errors.name ? (
  <div className="error">{formik.errors.name}</div>
) : null}
```

完成形

```
import React from 'react';
import { useFormik } from 'formik';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};

const onSubmit = (values) => {
  console.log('form data', values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is Required';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.channel) {
    errors.channel = 'Channel is Required';
  }

  return errors;
};

function YoutubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
```

## useFormik を使って form 実装 Advanced 編

### yup を install

- formik と連携してバリデーションチェックをする package
- Yup.object に`validation schema`を定義
- useFormik 関数の object に指定

```
$ npm i yup
```

```
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
});
```

```
const formik = useFormik({
  initialValues,
  onSubmit,
  validationSchema,
});
```

完成形

```
import * as Yup from 'yup';

import React from 'react';
import { useFormik } from 'formik';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};

const onSubmit = (values) => {
  console.log('form data', values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
});

function YoutubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
```

### formik.getFieldProps({name 属性の値})で refactor

- `onChange属性`、`onBlur属性`、`value属性`の指定を getFieldProps メソッドでリファクタリングする
- name 属性で指定した値を引数に設定
- スプレッド構文で展開

```
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.name}

↓

{...formik.getFieldProps('name')}
```

完成形

```
import * as Yup from 'yup';

import React from 'react';
import { useFormik } from 'formik';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};

const onSubmit = (values) => {
  console.log('form data', values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
});

function YoutubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            {...formik.getFieldProps('channel')}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
```

### Formik コンポーネントで全体をラップ

- formik が提供している `Formik` コンポーネントで form タグを wrap
- `Formik`コンポーネントの props`initialValues`、`validationSchema`、`onSubmit`にそれぞれの変数を指定

```
import { Formik } from 'formik';
```

```
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
>
```

### form タグを Form コンポーネントに変更

- formik が提供している `Form` コンポーネントを form タグと変更
- form タグで指定した onSubmit 属性を削除

```
import { Form } from 'formik';
```

```
<form onSubmit={formik.handleSubmit}>
↓
<Form>
```

### input タグを Field コンポーネントに変更

- formik が提供している `Field` コンポーネントを input タグと変更
- `{...formik.getFieldProps()}`を削除

```
import { Field } from 'formik';
```

```
<input type="text" id="name" name="name" {...formik.getFieldProps('name')} />
↓
<Field type="text" id="name" name="name" />
```

### ErrorMessage コンポーネントでエラーメッセージ表示

- formik が提供している `ErrorMessage` コンポーネントでエラーメッセージ表示

```
import { ErrorMessage } from 'formik';
```

```
{formik.touched.name && formik.errors.name ? (
  <div className="error">{formik.errors.name}</div>
) : null}
↓
<ErrorMessage name="name" />
```

完成形

```
import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import React from 'react';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};

const onSubmit = (values) => {
  console.log('form data', values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
});

function YoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" />
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;
```

### Field コンポーネントについて

- `placeholder`props で placeholder を入力できる
- `as`props で textarea、select タグを設定できる
- `field`コンポーネントの children に関数が書ける。その関数の引数に`field`、`form`、`meta`が設定される

```
<Field　placeholder="YouTube channel name" />
```

```
<Field as="textarea" id="comments" name="comments" />
```

```
<Field name="address">
  {({ field, form, meta }) => {
    return (
      <div>
        <input type="text" {...field} />
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </div>
    );
  }}
</Field>
```

### ErrorMessage コンポーネントについて

- ErrorMessage コンポーネントの`component`props に作成した component を指定できる
- そのとき作成した component の`props.children`に error message が表示される
- ErrorMessage コンポーネントの children に関数を設定できる
- その関数の引数には error message が設定される

```
function TextError(props) {
  return <div className="error">{props.children}</div>;
}

<ErrorMessage name="name" component={TextError} />
```

```
<ErrorMessage name="email">
  {(msg) => <div className="error">{msg}</div>}
</ErrorMessage>
```

### value に nest された object を 指定

- `initialValues`で nest された object を指定
- `Field`コンポーネントの name 属性で object の key を指定

```
const initialValues = {
  social: {
    facebook: '',
    twitter: '',
  },
};
```

```
<Field type="text" id="twitter" name="social.twitter" />
```

### value に配列を指定

- `initialValues`で value に配列を指定
- `Field`コンポーネントの name 属性で 配列の key と配列番号 を指定

```
const initialValues = {
  phoneNumbers: ['', ''],
};
```

```
<Field type="text" id="primaryPh" name="phoneNumbers[0]" />

<Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
```

### Field Array コンポーネントで動的に input タグを増減させる

- formik が提供している`FieldArray`コンポーネントを使用
- `initialValues`で配列を value とした key を設定
- `FieldArray`コンポーネントの name 属性に`initialValues`で設定した key を指定
- `FieldArray`コンポーネントの `children` に関数を設定
- 関数の引数には`push`、`remove`、`form`などの API が設定されている
  - `form` には value の key があり、`initialValues`で設定した key が管理されている
  - その key を map させて、`Field`コンポーネントと `button` を配置させる
  - `Field`コンポーネントの name 属性は`initialValues`で設定した key と map の引数(index)を結合させる
  - map の引数(index)を使用して`remove(index)`で input タグの削除を行う
  - 先頭の input タグは削除しないように設定する
  - button タグの onClick 属性に`push('')`を設定で input タグを増やす

```
import { FieldArray } from 'formik';
```

```
const initialValues = {
  phNumbers: [''],
};
```

```
<FieldArray name="phNumbers">
  {(fieldArrayProps) => {
    const { push, remove, form } = fieldArrayProps;
    const {
      values: { phNumbers },
    } = form;
    return (
      <div>
        {phNumbers.map((phNumber, index) => (
          <div key={index}>
            <Field name={`phNumbers[${index}]`} />
            {index > 0 && (
              <button type="button" onClick={() => remove(index)}>
                -
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => push('')}>
          +
        </button>
      </div>
    );
  }}
</FieldArray>
```

### FastField コンポーネントでレンダリングを制御

- `Field`コンポーネントを操作したとき、他の`Field`コンポーネントもレンダリングされる
- formik で提供されている`FastField` コンポーネントを使用すると、そのコンポーネントのみレンダリングされる
- 1 画面に 30 以上の`Field`コンポーネントがあある場合に`FastField`の使用でパフォーマンスが良くなる

```
import { FastField } from 'formik';
```

```
<FastField name="address">
  {({ field, form, meta }) => {
    console.log('Field render');
    return (
      <div>
        <input type="text" {...field} />
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </div>
    );
  }}
</FastField>
```

### validation が走るタイミングを制御

- デフォルトでは form の各項目を`onChange`、`onBlur`したタイミングで validation が走る
- `Formik`コンポーネントの props で`validateOnChange`、`validateOnBlur`を`false`にすると validation が走らないようになる

```
<Formik
  validateOnChange={false}
  validateOnBlur={false}
>
```

### Field コンポーネントで validation を定義

- `validationSchema`で validation を制御するのではなく、`Field`コンポーネントの`validate` props で validation を制御
- `vilidate`props には関数が指定でき、引数には`value`が入る
- formik が提供している`ErrorMessage`コンポーネントでエラーメッセージを表示

```
const initialValues = {
  comments: '',
};

const validateComments = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};
```

```
<Field validate={validateComments} />
<ErrorMessage name="comments" />
```

### trigger validation

- `Formik`コンポーネントの children に関数を設定できて、その関数の引数にはヘルパーメソッドが定義されている
- `formik.validateField({name属性の値})`、`formik.setFieldTouched({name属性の値})`で単一の fileld の値取得と操作ができる
- `formik.validateForm()`、`formik.setTouched({ name: true })`で validation を設定した全ての値取得と操作ができる

```
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
>
  {(formik) => {
    return (
      <Form>
      .
      .
      .
      </Form>
    )
  }}
</Formik>
```

```
<button
  type="button"
  onClick={() => formik.validateField('comments')}
>
  Validate comments
</button>
<button
  type="button"
  onClick={() => formik.setFieldTouched('comments')}
>
  Visit comments
</button>
<button type="button" onClick={() => formik.validateForm()}>
  Validate all
</button>
<button
  type="button"
  onClick={() =>
    formik.setTouched({
      name: true,
      email: true,
      channel: true,
      comments: true,
    })
  }
>
  Visit all
</button>
```

### submit ボタンを disabled で制御

- `formik.isValid`で validation エラーの有無を boolean で取得。`true`の場合はエラーなし
  - `formik.isValid`のみで disabled を制御すると page ロード時はエラーがないのでボタンが活性化される
- `formik.dirty`で`initialValues`と値が同じかをチェック
  - required の値が`initialValues`時に入ってる場合、`formik.dirty`で値と同じではないと`false`になる。よって disabled は制御できない
- `formik.isSubmitting`で submit ボタンが押されたかを判定(`true`の場合は押下)。この判定により API にデータを POST している非同期処理中は`false`に設定して、submit ボタンを非活性化にする
  - `onSubmit`関数の引数`submitProps`のメソッド`setSubmitting`で`formik.isSubmitting`を制御できる

```
const onSubmit = (values, submitProps) => {
  submitProps.setSubmitting(false);
};
```

```
<button
  type="submit"
  disabled={!formik.isValid || formik.isSubmitting}
>
```

この記述でページ初期画面はボタンが活性化になっているが、押下するとエラーメッセージが表示され、onSubmit 関数が処理されない

### load data で initialValues の値を変更する

- mock として`initialValues`と同じ schema の`savedValues`を用意
- button を押下したときに useState で`savedValues`で設定した値に変更
- `Formik`の props`initialValues`で`savedValues`または`initialValues`の値になるようにする
- `Formik`の props で`enableReinitialize`で`initialValues`が変更可能に

```
const savedValues = {
  name: 'Vishwas',
  email: 'v@example.com',
  channel: 'codevolution',
  comments: 'Welcome to Formik',
  address: '221B Baker Street',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};
```

```
const [formValues, setFormValues] = useState(null);
```

```
<button type="button" onClick={() => setFormValues(savedValues)}>
  Load saved data
</button>
```

```
<Formik
  initialValues={formValues || initialValues}
  enableReinitialize
>
```

### Form の値を reset させる

- button を押下して reset させるには`type="reset"`を設定する
- submit ボタンを押下した後に reset させるには`onSubmit`関数の引数`submitProps`のメソッドを使用`submitProps.resetForm()`

```
<button type='reset'>Reset</button>
```

```
const onSubmit = (values, submitProps) => {
  submitProps.resetForm();
};
```

### 完成形

```
import * as Yup from 'yup';

import {
  ErrorMessage,
  FastField,
  Field,
  FieldArray,
  Form,
  Formik,
} from 'formik';
import React, { useState } from 'react';

import TextError from './TextError';

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const savedValues = {
  name: 'Vishwas',
  email: 'v@example.com',
  channel: 'codevolution',
  comments: 'Welcome to Formik',
  address: '221B Baker Street',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const onSubmit = (values, submitProps) => {
  console.log('form data', values);
  console.log('submitProps', submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        console.log('Formik props', formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="YouTube channel name"
              />
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {({ field, form, meta }) => {
                  return (
                    <div>
                      <input type="text" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const {
                    values: { phNumbers },
                  } = form;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => push('')}>
                        +
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* <button
              type="button"
              onClick={() => formik.validateField('comments')}
            >
              Validate comments
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit all
            </button> */}

            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
```

## 各処理をコンポーネントに分ける

### FormContainer コンポーネント

- form の大元のコンポーネント
- `select`、`radio`、`checkbox`の option を設定
- `initialvalues`、`validationSchema`、`onSubmit`を設定
- `formControl`の props に 各要素の data を渡す

```
import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import FormikControl from './FormikControl';
import React from 'react';
import SubmitButton from './SubmitButton';

function FormikContainer() {
  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option 3' },
  ];

  const radioOptions = [
    { key: 'Option 1', value: 'rOption1' },
    { key: 'Option 2', value: 'rOption2' },
    { key: 'Option 3', value: 'rOption3' },
  ];

  const checkboxOptions = [
    { key: 'Option 1', value: 'cOption1' },
    { key: 'Option 2', value: 'cOption2' },
    { key: 'Option 3', value: 'cOption3' },
  ];

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    birthDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required'),
    description: Yup.string().required('Description is Required'),
    selectOption: Yup.string().required('Select is Required'),
    radioOption: Yup.string().required('Radio is Required'),
    checkboxOption: Yup.array().required('Checkbox id Required'),
    birthDate: Yup.date().required('BirthDate is Required').nullable(),
  });

  const onSubmit = (values) => {
    console.log('form data', values);
    console.log('Saved data', JSON.parse(JSON.stringify(values)));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            name="email"
            label="Email"
            type="email"
          />
          <FormikControl
            control="textarea"
            name="description"
            label="Description"
          />
          <FormikControl
            control="select"
            label="Select a topic"
            name="selectOption"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Radio topic"
            name="radioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            label="Checkbox topics"
            name="checkboxOption"
            options={checkboxOptions}
          />
          <FormikControl control="date" label="Pick a date" name="birthDate" />
          <SubmitButton formik={formik} />
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
```

### FormControl コンポーネント

- form の各部品を読み込む
- `control`は呼び出し元`containaer`で指定した部品名
- `control`以外の props は各部品に送る

```
import ChakraInput from './ChakraInput';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import Input from './Input';
import RadioButtons from './RadioButtons';
import React from 'react';
import Select from './Select';
import Textarea from './Textarea';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <RadioButtons {...rest} />;
    case 'checkbox':
      return <CheckboxGroup {...rest} />;
    case 'date':
      return <DatePicker {...rest} />;
    case 'chakraInput':
      return <ChakraInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
```

### Input コンポーネント

```
import { ErrorMessage, Field } from 'formik';

import React from 'react';

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
}

export default Input;
```

### Textarea コンポーネント

- `Field`コンポーネントの`as`props で`textarea`を指定

```
import { ErrorMessage, Field } from 'formik';

import React from 'react';

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
}

export default Textarea;
```

### Select コンポーネント

- `Field`コンポーネントの`as`props で`select`を指定
- `Field`コンポーネントの`children`に option を map で展開

```
import { ErrorMessage, Field } from 'formik';

import React from 'react';

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Select;
```

### RadioButton コンポーネント

- `Field`コンポーネントの children に関数を設定。その関数の引数`field`で選択している radioButton を抽出
- 各 radioButton の`id属性`と`value属性`はユニークな値。`name属性`は共通の値に設定

```
import { ErrorMessage, Field } from 'formik';

import React from 'react';

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  id={option.value}
                  type="radio"
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default RadioButtons;
```

### Checkbox コンポーネント

- `Field`コンポーネントの children に関数を設定。その関数の引数`field`で選択している checkbox を抽出
- value は配列で管理するので、`includes`メソッドで選択している`value`を抽出
- 各 checkbox の`id属性`と`value属性`はユニークな値。`name属性`は共通の値に設定

```
import { ErrorMessage, Field } from 'formik';

import React from 'react';

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  id={option.value}
                  type="checkbox"
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default CheckboxGroup;
```

### DatePicker コンポーネント

- `react-datepicker`を install
- datepicker の css は`react-datepicker/dist/react-datepicker.css`を使用
- `Field`コンポーネントの children に関数を設定。その関数の引数`field`、`form`を設定
- DatePicker の selected 属性に`field.value`を設定
- DatePicker の onchange 属性に`form.setFieldValue({name}, {onchagen関数の引数value})`を設定

```
$ npm i react-datepicker
```

```
import 'react-datepicker/dist/react-datepicker.css';

import { ErrorMessage, Field } from 'formik';

import DateView from 'react-datepicker';
import React from 'react';

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default DatePicker;
```

### Submit button コンポーネント

- disabled を制御するために`formik`を props として受け取る

```
import React from 'react';

function SubmitButton(props) {
  const { formik } = props;
  return (
    <button type="submit" disabled={!formik.isValid}>
      Submit
    </button>
  );
}

export default SubmitButton;
```

## サンプル画面

### アカウント登録フォーム

- パスワード確認用の validation チェックで`oneOf`メソッドを使用
- お問い合わせ方法が電話の場合、`phone`の validation チェックで`when`メソッドを使用

```

import \* as Yup from 'yup';

import { Form, Formik } from 'formik';

import FormikControl from './FormikControl';
import React from 'react';
import SubmitButton from './SubmitButton';

function RegistrationForm() {
const options = [
{ key: 'Email', value: 'emailmoc' },
{ key: 'Telephone', value: 'telephonemoc' },
];

const initialValues = {
email: '',
password: '',
confirmPassword: '',
modeOfContact: '',
phone: '',
};

const validationSchema = Yup.object({
email: Yup.string().email('Invalid email format').required('Required'),
password: Yup.string().required('Required'),
confirmPassword: Yup.string()
.oneOf([Yup.ref('password'), ''], 'Passwords must match')
.required('Required'),
modeOfContact: Yup.string().required('Required'),
phone: Yup.string().when('modeOfContact', {
is: 'telephonemoc',
then: Yup.string().required('Required'),
}),
});

const onSubmit = (values) => {
console.log('Form data', values);
};

return (
<Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
{(formik) => {
return (
<Form>
<FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
<FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
<FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />
<FormikControl
              control="radio"
              label="Mode of contact"
              name="modeOfContact"
              options={options}
            />
<FormikControl
              control="input"
              type="text"
              label="Phone number"
              name="phone"
            />
<SubmitButton formik={formik} />
</Form>
);
}}
</Formik>
);
}

export default RegistrationForm;

```

## UI ライブラリ「chakra」を使用

### set up

- chakra を install
- `ThemeProvider`コンポーネントを wrap させて、`theme`props に theme を設定

```

\$ npm i @chakra-ui/core @emotion/core @emotion/styled emotion-theming

```

```

import { ThemeProvider, theme } from '@chakra-ui/core';

import React from 'react';

function App() {
return (
<ThemeProvider theme={theme}>
<div className="App">
.
.
.
</div>
</ThemeProvider>
);
}

export default App;

```

### Input コンポーネント

- `FormControl`、`FormErrorMessage`、`FormLabel`、`Input`は chakra-ui が提供しているコンポーネントを使用
- `FormControl`の props で`isInvalid`を設定

```

import {
FormControl,
FormErrorMessage,
FormLabel,
Input,
} from '@chakra-ui/core';

import { Field } from 'formik';
import React from 'react';

function ChakraInput(props) {
const { label, name, ...rest } = props;
return (
<Field name={name}>
{({ field, form }) => (
<FormControl isInvalid={form.errors[name] && form.touched[name]}>
<FormLabel htmlFor={name}>{label}</FormLabel>
<Input id={name} {...rest} {...field} />
<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
</FormControl>
)}
</Field>
);
}

export default ChakraInput;

```

```

```
