# react-formik

YouTube チャンネル CodeEvolution「React Formik」を参考

## SetUp

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
- value 属性にに useFormik の API`values`を指定。`value={formik.values.{name名}}`で`formik.values`で設定した name のデータが表示される

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
- validate メソッドの引数`values`には各要素の name の値を key とした data が入る
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

- ユーザーが touch した項目のみ validate 検知
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
$ yarn add yup
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

- `formik`で提供している Formik コンポーネントで form タグを wrap
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

- `formik`で提供している Form コンポーネントを form タグと変更
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

- `formik`で提供している Field コンポーネントを input タグと変更
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

- `formik`で提供している ErrorMessage コンポーネントでエラーメッセージ表示

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
- `as`props で textarea タグを設定できる
- `field`コンポーネントの children に関数が書ける。その関数の引数の object に`field`、`form`、`meta`が設定される

```
<Field
  placeholder="YouTube channel name"
/>
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
- そのとき  作成した component の`props.children`で error message が表示される
- ErrorMessage コンポーネントの children に関数を設定できる
- その関数の引数には error message が設定される

```
function TextError(props) {
  return <div className="error">{props.children}</div>;
}

<ErrorMessage name="name" component={TextError} />
```

```
ErrorMessage name="email">
  {(error) => <div className="error">{error}</div>}
</ErrorMessage>
```

### data に nest された object を 指定

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

### data に配列を指定

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

- `formik`で提供している`FieldArray`コンポーネントを使用
- `initialValues`に配列を value とした key を設定
- `FieldArray`コンポーネントの name 属性に`initialValues`で設定した key を指定
- `FieldArray`コンポーネントの children に関数を設定
- 関数の引数には`push`、`remove`、`form`などの object が管理されている
- `form`object には value の key があり、`initialValues`で設定した key が管理されている
- その key を map させて、`Field`コンポーネントと button を配置させる
- `Field`コンポーネントの`name属性`は`initialValues`で設定した key と map の引数(index)を結合させる
- map の引数(index)を使用して`removee(index)`で input タグの削除  行う
- 先頭の input タグは削除しないように設定する
- button タグの`onClick属性`で`push('')`を設定で input タグを増やす

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
