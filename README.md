# react-formik

YouTube チャンネル CodeEvolution「React Formik」を参考

## formik install

```
$ npm i formik
```

## Simple Form

simple form の HTML

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

### useFormik で form の state を管理

この form を useFormik を使用して state 管理する

- useFomik 関数の object を指定
- formik.values で各要素の value を管理
- initialValues で各 form 要素の初期値を設定
- initialValues の key 名は form 要素の`name`の値
- onChage 属性`onChange={formik.handleChange}`で`formik.values`の設定した name を key にデータが入る
- value 属`value={formik.values.{name名}}`で`formik.values`の設定した name のデータが表示される

```
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: {
    name: 'Vishwas',
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
