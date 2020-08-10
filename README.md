# react-formik

YouTube チャンネル CodeEvolution「React Formik」を参考

## formik install

```
$ npm i formik
```

## useFormik を使って form 実装する

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

<form onSubmit={formik.handleSubmit}>

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
