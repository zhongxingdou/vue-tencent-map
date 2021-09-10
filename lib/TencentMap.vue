<template>
  <div></div>
</template>

<script>
export default {
  props: {
    latitude: Number,
    longitude: Number,
    address: String,
    name: String,
    label: String,
    // 设置地图缩放级别
    zoom: {
      type: Number,
      default: 17.2
    },
    // 设置俯仰角
    pitch: {
      type: Number,
      default: 43.5
    },
    // 设置地图旋转角度
    rotation: {
      type: Number,
      default: 45
    },
    labelStyle: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
    markerStyle: {
      type: Object,
      default() {
        return {}
      },
      required: false,
    }
  },
  mounted() {
    const { latitude, longitude, label, zoom, pitch, rotation, labelStyle, markerStyle } = this.$props

    const TMap = window.TMap
    if (!TMap) return

    const center = new TMap.LatLng(latitude, longitude)
    const map = new TMap.Map(this.$el, {
      center: center,
      zoom,
      pitch,
      rotation,
    });

    //创建并初始化MultiMarker
    const styleId = 'myStyle'
    new TMap.MultiMarker({
      map,
      styles: {
        [styleId]: new TMap.MarkerStyle({
          width: 40,
          height: 40,
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAH39JREFUeF7tXQm4HFWV/k919+0sLMIQA8nr6gSS19WPEIigEhKJskdBRhRxxQWXGZhBBUfBfUaDOINbVBxBUdFxHAUcQI3sIFsGFQbyfF39Qpaufgm4ISNL0tXddea7jwcm4b28vreq+nV13/t9fPLJ2e5/7v/6VtW55xLMMAgYBCZEgAw2BgGDwMQIGIKY1WEQ2A0ChiBmeRgEDEHMGjAI6CFgfkH0cDNaPYKAIUiPJNpMUw8BQxA93IxWjyBgCNIjiTbT1EPAEEQPN6PVIwgYgvRIos009RAwBNHDzWj1CAKGID2SaDNNPQQMQfRwM1o9goAhSI8k2kxTDwFDED3cjFaPIGAI0iOJNtPUQ8AQRA83o9UjCBiC9EiizTT1EDAE0cPNaPUIAoYgPZJoM009BAxB9HAzWj2CgCFIjyTaTFMPAUMQPdyMVo8gYAjSI4k209RDwBBEDzdlrY3zZ86uNRqHwsJi4mAuM70QxLMINAvALAZeSECGgToBTwF4ioGn5b+P/e8ICIMUYF2KaXDBSO1h5SCMgjIChiDKkE2uUO6bPjdINV9KAZaCsJjBhxJo9uSaShLbAaxj8FoC3Zliun9htbZByYIRnhQBQ5BJIZpcYLAv85JMynoxg18ExjIAhcm1opdg4GFi3McW3ZupW9cu2LqtGr2X3rJoCKKZ73XzZ87ONPzTiPAaBh2vaSZOtaeZcJ0V4Nonmv51R2zF03E661bbhiCKmS3ns6/kAKeB+DUA9lVUnyrxKjFfG1j8g2Klce9UBZFEv4YgLWZt2M6eHIDfA+CUFlU6UoyBq4npSqdau64jA+ywoAxBJklItxBj12ky6JdEwZVOpf6tDluTHRWOIcgE6RjOpY8OyDofwKs7KmPRB/NzILjI8Rp3R286+RYNQXbJ4dD8aXlqNs8n0D8mP72tzYCAJjMueiTlX/SKzZCvj80YQ8AQZIelUM5lz2Ni+asxpxdXCAH3SaI4Vf/aXpz/eHM2BAEwnBfFgPFFACeahQEw4aJixf+owQLoeYKU8uI0YnwBQN4siL8iwMCNaeILFlbqD/QyLj1NkHJOfIQJq6ZwATQBjAA0AvAWIh6RsTBTH0BzAe4DIP9JTVGMjxH4goJXv3yK/E+5254kyKZ5mFYLhEz6W9qRAVkCAvAaJqtsBZIEvKWREiOLNj/1aCv+B+fN3D/d9EdJE1jURxwUAFpJwIJW9EPLEF3qVGrnhLaTQAM9R5Ch/IwDLG5cDWBprPlirLGI1rDFNxU2+24cvsrzhEMBHR8wrwRhZRw+nrUpv5s86tWOfQXQiNNPp9nuKYLIh3Fmvo2jr6yVD3MbAboFzLeg6d9S2Io/tjPZ5TnYDylxLIiOBfhYBg6Mwf+fGgEduaiHSu17hiClfPooYiuOj2G/YfBlRa9+WQwLUttkyc68h0CyNOZwbSMTKDIFy4qVxj1R2+1Eez1BkPW57EFN4qgPGHUkMXZdZHERJUhZ8wY2ba904qKOMqauJ8imeTP3rwX1RyIELRHEaANRHqeGv7DdW8kI89iSqa4myNoF2OsFvrgDwGEtobF7oUQSI16i8K17NeqnzOnisyZdS5AfAanFtpBvq04NTw76huPV/i68nc6x4NrZfwf4vWEjIsY1har/2rB2OlW/awni5sS3QHhnWOAJ+GTB8/8lrJ1O1C/b4hMM/HPY2Jj4C8VKXdawdd3oSoK4efFxMMIu6iYzv6tYrX+n67K+w4RKuczbieibob/WM5/lVOtXdBtWXUeQsp15K4OuDJUohscpa0Vx8/bNoewkRLk0b9o8agZ3gGCHCPlxCvjEwkj9vhA2Ok61qwhSzqVfxmT9DMCe2kgz3+5U66/Q1k+wopvL3Aail+tPge6q1WonHfq70b5eXTG6hiCyvmp7IO4hYIluZuR+vOj5n9LV7wa9ki0+JZ+7dOdCzJ8vVOsf1NXvNL2uIUjYylwGvlP0/Hd0WoKmIp6SLb5NwNt1fQegEwa82k26+p2k1xUEcednC2iyLH3QbMPDtzle/Zh2JWZwFvZIZ7PLQcF8Bh1IhPnAc//IMDbJf5ixicAbwdamRq1216I/4Ml2xejamVsB0ttqdtE2tSsIUrKzlxH43ZqLZ+OTs3zniN+grqk/qRoD1nAuvQxkLWPmE7X3+cy3E9EN4ODu/mrjbgKCSZ1rCvz6cGT2+IOQVchaRY8EXFjw/Is13XeMWuIJsj6XPaFJfIMOorJZASwsirMcnZnOBbPsjDJXJ8bd6GwB0XVEvDrO+BFgkPUObD1hWXx0/+b6/0Y877aaSzxBynlxDTNkl0PlYRGd3F+pybdekQ5Zes4pcS4I5wLYO1Ljzzf2f2Cspqa/Oo66qOF89lUB80+15sC4wqn6Z2npdohSoglSttPLGdadeljS+xyvtlpPd2It186eC7AkxkFR257E3gaAVsc4py/rzIc4OLpQbWjmSMdjtDqJJojuswcDVxU9//QoodxwIPauN8QPALwySruqtgh8Mwd0vjPiP6Squzv5ki1+TMDrVG0S4YeFiv9GVb1OkU8sQcbeXMn97TRVMKM+8CObzaWawc8YOFg1ljjkCXhc/ooVvPr3orIf6sBZQCudkdovooqlnXYSS5BSXqwixkfUweIvO179/ep642u4fWIxLMhXzDOjshmZHcYlTtX/p6jsuXbmSwC9T8Pe9Y7nJ7KFayIJ8uBszMxmxSCAeYrJekSkrKUHRnQSbiiXPtoiS5436eRxo+P5kTTE2zh/Wt5vBvL6hANUJ2xZvCSJb7QSSZCxCtRvqyYJwIcdz/9XDb3nqbj5afPBwcYobLXBxgWO538uCj+uLT4EQN0W49NO1f9EFDG000YiCeLaQr6aVX0Y/s2Ts/ylUXwQHL1dqlmXTd7S7UxWGF8E67iCt/2WMDak7tgHRPkrotQMgoHfFj1/UVj/7dZPHEHKucyLmUi9pJrwFqfi/0dYgN39sCdmCLnQXhzWVpv1G5mABg4aqa0P69fNizeD8X1lO4y/TVpj7MQRxLWF3CKpPXgy1jhVX/UX53n5j/YY707mqwR2wSiP/r+EAoMcADnlRbgbBfkK2BL1kxc+jFpYu25O/Fy1WR0DVxY9/21hfbdTP4kEKQGQi0dh0Psdr6b1oWtHJ25efAaMKLqe38DAWjDdm87W7l34MP4y3mTWL8BejVp2KYiXEnBkJN3nCauciv8xBfDGFXXt7PsA/pKinUcf8vy+18sSn4SMRBFEd3vFTSoUt9SGw+RkvS0GmiQXdYjDWMDWgHnVQLV+qU4sQ7nM2RaRJKj+/SWEJ1KMIxd6/pBODM/qlOZm+ynFz/ziKQwLdEJ/gkrhE0UQ1xYfBqBYIcq3Ol79WIUcTvQXM1QXEPlF2QroYwurtQ1hYpFN8AKLP8OMN+jbiaZLi2tnbgFI6ZgAARcXPP9C/djbq5ksguTFGjBOUoQo9KvdsfsKtb93ENGlhYi7o5fz2a8x89mKWDwnbnGwor/a+KWuvtTTeeVLjLWFqh9v4/Awk9pFN1kEscU21dKSRtrKL9q43QuDmWuLqwBo9X6Kq2JYzidUpS1wteP5yrVVO+I4eOA0O90IlNuPpoS/90TPXWHyFIduYghS6ku/nCzrNjUQ6C7Hq71MTWdn6cF5mcPSAWndssSENxcrvixgjG2U8uJNxNB6fd2weMmikOc1XDt7J8DLlSaYoNqsxBBkKJ85y+LR/k0KI3xJ+5Cdfb8FlvcXKg0Cf6Xg1WXZe+yjbGdWs8atvAHoAwNeTfVN1E7zGSvvV3tDyHy2U61/PXZgInCQGIKU82IVKxYnpjNi9oINT/4+DE5uXvwEjL9VtDHYCPwVi0bwmKKelvhgH/ZNW6M9iNW+VBP+26n4WofNng304YP2eGGj7v9OJXBmXFKMsIhSxbeqbGII4trihwDOUJjg447n76MgP66oa4s/A3iBip2A8caBqi/jbdsYyok3WIT/VHQ4VRiFfv5RnKe2eJII8isAR7Q6UwbWFz2/v1X58eTGGtGpvekhfNup+KF7AuvE7ebFFWAotS6K4sRfyRbDBCxUiPl+x/OVarkUbEcqmhiClGzxGAEt/yIwcE/R85eFQUuniZpFeHN/zA/mE81pOC/eFCg+sEfRLK9kC9lh5SgFrP/seL5miyYFLxGIJoIggwMQ6SeFWv1QBPvrki2+S8CZKjizZc2fqp6+oz12g0D21Gp5RFEfpfOc1tjDzy4agt9yoFMkmAiCPGRjHwGh9MDLoMuLXk3e0ac9XDv7S4BVXhNvcjxfq4+UdpC7KLq2kGdUZCO6Fgfd6Xi1o1sUHldMpzeAD3/fxR7k811Hj0QQ5MG50/uyqWZVBUkmXFSs+KEKC8u2qDLQ16pfBq4uhvz41qqvieRKtriKFD5qEjBS8PxQVcM6x59rzVTu0C3b5Jmajh6JIMhYgwalu8bDvuPX3NZFUikbZsXoVByH3e5ofStKkeNsqikXO4bBRkc3EQQZymdeZDH9RmWCYb9i65CSwGdG2UlEZb7PymrdjxJysep8zQ+IDx+o1O/XmWM7dRJBEJ3XrWE7jA/Py7w0CGitSjIColcNVGo/V9GJWnYon32lxazULdKy+Mj+zfX/0Y1lyM4eb4FvVNGP4vWyij9d2UQQRKcOi4PgFcWRxu26wOh8ISam8wrVmnJZim6M4+mVc9kPyDsDVWyGrTiYivyozC+MbNcSJIqDOa4t5HUDCv2uojlnESahGrfXPuV4/h5hfA7b2eMDxV+QsH/AwsSropsIgqy3xcFNQPbBan1E0KShZIt1pFLf1AH3Yqheo8bAYNHzD2kd2OdL6jRxSAGLFnr+b8P4bYduIgjywDy8YHowWhPV8mCm84vVmtJWY1fjri2uBaDSEXCb4/kzWg4yBkHXFk8DmK5g+jrH80PdJV/KZc8j4s8r+MQ2y99nyWbZIrWzRyIIIiEs2eJJUtru4HOO518QBn6dVptMwVHFSkP2jWr7KOXTS4kt2QZVYYRvxeraQh6DlsehWxoMPFUMua1ryVEEQokhiGuP3nZUaHnOERQN6mwdpvJBXecBHRFsRTWKJMuO5yt2pmk585EKJoggag0CCPhZwfNPDoPWUH7GARY3tira2ABOH+1Un1bVU3Szs7ibmzEHNHrGXOlekoDScwYqTz8SxnnZFj9l4FWt24imkUbr/vQlE0QQcSWAtypMNZK6qHJerGXGSxX8Io4mDZP512niQIT/KVR82W8r1FCv/8L3HM9XKgINFWAI5cQQpGyLixhQahcTRWWtTunGWD5OdzxfNnuIfbi2kM0XfqzsKIImcjoVxAR8tuD5GldXKM8wtEJiCKJ1Yi6C/bXOl+mxrDyRCejwKHrh7i7LG/qyC+sWyzKcPVVXQxRf/nWe06bixKUqNs/KJ4YgYwtBrTsi0dedSk27d5QE6dcHYu89G0Le9NpyVe8Oyag4nq96h4lSLl1bbAaQV1Iabf+LkSfS/qIjNuL/VHV3lHfz2UvB/PcqNjIB9cf9h0Mlnt3JJoYgchKuLf4EoOWTaFG13B/OZ/8pYNa6V4SA+2YE/stzI5A9vSIb1T5Mf9oStzPwEh2jFtGH+iu1f9PR3VGnZItBUrt67jHH8/8mrN926SeKICVb3EDACSrgNICDF4XsQ7t+AbKBL9YycJiK7x1kt4CsM53K9ls19XdSc/PTjgEH8qWF1t3rBPyvJfwjw3Z5H7TFQBpQ+hrOwI3FiG68igLLyWwkjSCfJUDp4x8xn1PQbBa9I3jDucw7AqIrJgN0t/+dsOqxpr/qKM1fk3v6MH3flPho2A7zFvM7+6t1nRu6dppeOZc5m4m+poIJAxcXTW9eFchal9U5d0CMnxSq/mmte5lYsmxnbmLQcSFt/QqMVdtS/h2tllqMlto0xQrQ6NULoS7ukXeEFLz68SHnMKpezolrmKDUVyvsOZ0o4laxkaxfkD5xCFlQvf/7iZTvH7TwUfxBBZjxZNfb2VOa4OvC2hnTbwB4AOC7QVgH5jI1GqMn7DidLoCoAMYhAMnOLEuiuu4tBXr1Qq92fdg5rN8fs5pCyE71Sm/POMDi4oi/Lqz/dukniiASlJIt1hOwQAUgi/Gm/qqv2lRtXBflXPY8VizMU4k1Ttkozuk/G99wTrwxICj1HWbg4aLnq/TPihOOlmwnkCCZ1aTah5ZxhVP1z2oJkRaEdHvhtmA6NpGoH47dnPgWCEoN8hj8lWKb+hVHBWTiCFLOZ1cys9qxVoZXqPoHESC3NZGMUk5cQ4r770gc6xmJ9NUqA+lyTmwAwVYJh4heWajU1qjoTLVs4giiu81i0ClFr/bTKAHXuWEpSv+t2qozLTgk5M1WO/oq2dmTCaz0HJPE7ZWcc0IJorHNAq5yPP/0VhdVq3KlXOarRHROq/JtltsOsgacynalbouTxejaQtZ9KV2+k8TtVWIJorXNGv1rELys4DXummwBqP73cj57DjN/VVUvTnlm/KBY9d8ctY+ynV7OsO5UtZvE7VViCaK7zSLQNwte7d2qyW1F3s1l3oGwHxJbcdSCDAEXFjxf8bLTFgzLbx929nIGv6s16Wekkrq9SjhBtLZZjYCxZKDqqzWAaHE1DOXEGdYzH/NCNUFo0d14YuuYcHFc174N5cQii+S3G6RVYkzq9irRBHHt9DLAUt8uMS5xYrzd6NdzMGPPtDiXAXn92gEqCymE7CMErH6i4a8+Yitk04ZYhpsT/wbCB9WNB8sdr3G3ut7UayTyIf1Z2FxbyK/ap6jBSH9MNa0lC2NunCxvgM3Um+cykSRKRi3GlqXrxLy6nkmtDnuT72Qe18+d3tdMBfLL/36Tye7y3693PF+lM4yi+XjFE02Qck6cwQTlq86iuDSm1bTIvsLEdAIRVoDxctVrrMfxsx2E25lxBxPf2K7+tjqXCY1uURhvKFT9/2oVr06TSzRBJJhlW9zPz9QqqYyt0yh9xLyQzQpUHErZTfMwbRtnj00hOCYIaBkRzwfohbu3w79npk2WxXc3Yd06nWq3zN+M7aq+w8hvzs84YDs3fg1gjoodAh4oeP6LVHQ6TTb5BMlnz2fmS1SBbeevyO5ie3A2Zs4UYn4DdCBo7OIbxqY0eONTvr/p0N/hKdW5RS2v/etB9MFCpabUUC7q2MPaSzxBNs2buX+NGw+BeZYiGFPyK6IY45SL6/56gOgPWUovnr/5qUenfBIhAkg8QeTcXTvzRYDer4oDAZ8qeP4/q+r1knzZFp9k4FPqc+YvOV79A+p6naXRFQQZu2BH3uWh+rbI/IrsZj1q/3oA9YD4yHa9QIiTUl1BEAlQOZ+5RDasVgWrU55FVONuh7z+swd/vlCpa3wvaces1Hx0DUGG5k/LUzNYS8D+KhAw8GcEWJGkU24q89OVLfWJQ2DhDpW76aUvBh7llHXkwKbtFV3fnaTXNQQZ/RWxxYUMXKQB8I8czz9DQ69rVVxbyG8Xr1edIAEfKXj+Z1X1OlW+qwjy6GzMfDwr5LPIIlXAifjdhUr9m6p63ShfzmfexUyXa8xt8AU1/8j9O+DVtEbs46p0FUHkDEt25j0E+oYGQJUgZa3olq2BxvxHVeRW1WoGd+h0a2Twe4te/TJd352o13UEkSC7+eztYF6hDjh904mpHF49lqnRcO3s5VAsZx+NlOgOp1KTpTRdNbqSIMN5cVrAuFozU2c4nv8jTd1Eq7m2kM8cWnVTFuG1/RX/mkQDME7wXUkQOc9yXvwnM96gkbB10+GvyHtQuhNRw09HqVRs7LMNQm6tlM+yEOGHhYr/xo6aUETBdC1BSnbmcALJ8yLTVLEi8FcKCWtPozrHXeVDtDLazuDlRa8ur2DoutG1BBl9FsmJT4PwMZ2sJa1Fps4cn9XRaen6nD/GZ5yq//Ew/jtZt6sJsn4B9mr6Qv6KKG8bZHU6yDo26o4gnbYY3Py0+eDgFmCsklgtwHUp4S9f+DD+oqaWHOmuJohMw5CdOdMCfVcrJYwfODF0BtGKJSYlNyf+A4Q36ZgPwG8b8OryGoauHV1PEJm5MF0QGXRu0at9pRtXQMnO/iOBV+vMjRk/KUbUNV/Hf7t0eoMg+fRSi627GLA0gP0LmI91qnV5oq5rhpvLHAEiubXaS3VSBAQBBcuLlca9qrpJk+8JgsikuLb4HIAPaSboBsfzT9LU7Ug11xa/AHCiZnD/6nj+hzV1E6XWMwQZe2C/WfcCmm4qi9ctYx9b2b9KCf+4bn4w35HBPUMQOemynT2OwTfp/glLAacvbNPd57oxTqa33hava+rcqT5mmEDHF7ya/EPTE6OnCDK61cqJj4LwGc3sVi3Cif0Vv6SpP6Vqw3lRDBg3AMhpBcL4mFP1V2npJlSp5wgi81SyxXWk3HDuuT+hv3Aq/sok5tvNizVgaD1LMXB9McEN4HTz1ZMEkT1mU8Q3M2i2DnDM/PliNVlHSku5zCVE6keSJT4E/l2T6bi4ehrr5KBdOj1JkNGtVj5zFpj0D0gxv9OJ4CrldiQ6dOd54nc5lfq32hFrp/noWYKMPbR/g8Hv0UzKnyngkwoj9fs09duiVu7LvIQtkq9099FxSKDLCl7tvTq63aDT2wSZg/04JW4G4VC9ZNJdtVrtpE7ofjhe/LJrYzab/QXAy7Xmx3iQmv5xha34o5Z+Fyj1NEGe2WpNOwYcyIslhWY+v+d4/pmaurGqubaQdVJv1XTig6yVTmX7rZr6XaHW8wQZ3WrlMmcz0df0M8pfdry6cmdHfX+Ta7p25ksAvW9yyfEliPmcQrV+qa5+t+gZgoxlMsSBoWcsED7hVPxPd8LCcPPi42D8i24svXhgbCKsDEHGkPkRkDrUzqxh0PG6Cysg+oeBSi3EL5Gu57/qDeWz51ghLhQl8E0PevWVrwea4aNJvgVDkB1y+FtbHJwG1rDul2bIcmE6od+raZezhFlSw3b2+AB8o64NAqoNYOXBnv9bXRvdpmcIsktGS3nxWmJcFSLR26ZR+qB2X84z1mh6A4DpurEz4XXFiq/bDUbXbUfrGYKMk56Q9VrS4ojj+Xr1TprLxbVFFUCfprpsqttzdVatYGUIMgFKri2+B+AtrYA4rgzhIafia35fUfPq5sWDYCxW09pJ+vuO5+u+Dg7htvNVDUEmyNHgLOyRnp65FqBjQqTxKsfzTw+hP6mqa4sfA3jdpIITCBD45j0b9VPnxHh9tG5snaBnCLKbLKzLZQ8SxNcycLBusuK8xSrkwScQ4cGMZZ16YJdcVaCbo93pGYJMgmopnz6KOHWtxv3gz1km4MKC518cZQLLtriAgTDXDGwF86nddtY+SoylLUOQFhAd6hOvsSyE6jtLTOcVqrUvtuBuUpFyLvsBJv7CpIITC9SJ6NRCpSZLbMzYDQKGIC0uDzeX+TsQfb1F8XHFoijfCF8WM3q+422FLu9nFSZPO+oagiggWbLFJ+UzhYLK80VDnK0IfYZl9JaC5N9dHgp/RWVDEEXA3Hz2UjD/vaLaruJvdTz/+yo2XFvIV87y1bP2IOBzBc+/QNtADyoagmgkvZQTVxPhNA3VHVVOd1rskOLaQr7Gla9z9QfhCqfin6VvoDc1DUE08+7a2bsAXqapPqrGoFcXvdr1u7NRsrOnEPi6MH4AXO/0YMOFkJiNqhuChECxZIv1BCwIYQLMdGKxWhu3wLCUy55AxLJNj/YgxtpC1V+qbaDHFQ1BQi4A1xay9f+eYcwQB0cXqo07d7RRzqVfxmT9MpRdYEPB80MROIz/btA1BAmZxbGryx4LaQZAsNzxGndLO66dXgZY8l4T7UHAXwqev7e2AaNotlhRrYH1thhoAqHPUFigU2RMAXi3zyWtxL3N8vdZshmPtyJrZCZGwPyCRLQ6Sn3pFWRZt0dkLpQZTlOhuLE2HMqIUTa/IFGvgWfqtqzRbdJUjfGeZ6Yqlm7wa35BIs5iOZd5MRNNSTO5wOKlA5vrayOeUk+bMwSJIf3D8zKHBQE9EIPpCU1Skw8rbKk/2E6fveDLECSmLMsGEClgMCbzO5nlJhWKW8wzRxxYG4LEgeqYzdLcbD+luByjC6SaqdzCLdtG4vTRy7YNQWLO/tg95BvjcMNNf7/iFvwpDtvG5jMIGIK0YSWsnzu9r5lqyq4jkY29Gv5Mc448MjgnfraL34XxIBFYN3/m7Eyz/mgEaDQLnp8hWetoRuwImF+Q2CH+q4PBPuybtoT+lojwhFPxle81b+MUu86VIUibU+ruhz0xY7TAUWkQ+PcFr651ZZySIyO8EwKGIFOwIG6bh2kHBGKbguuK4/nzFOSNaEQIGIJEBKSqGdlNfrEtGi3ouY7nF1uQMyIxIGAIEgOoKiZLtniEgP3H0yHggYLnv0jFnpGNFgFDkGjx1LJWtsX9DCzZRfkex/NDHenVCsYomWeQTlwDZVt8m4G3y9gI+E7B89/RiXH2WkzmF6SDMi577cpwip4frvdWB80p6aEYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBEwBIkVXmM86QgYgiQ9gyb+WBH4f1ilp19Qn01PAAAAAElFTkSuQmCC", //图片路径
          //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
          anchor: { x: 20, y: 40 },
          ...markerStyle,
        }),
      },
      geometries: [
        {
          id: "marker1",
          styleId,
          position: center,
        },
      ],
    })

    new TMap.MultiLabel({
      id: 'label-layer',
      map,
      styles: {
        [styleId]: new TMap.LabelStyle({
          color: "#3777FF",
          size: 20,
          offset: { x: 0, y: 20 }, // 文字偏移属性单位为像素
          angle: 0, // 文字旋转属性
          alignment: "center", // 文字水平对齐属性
          verticalAlignment: "middle", //文字垂直对齐属性
          ...labelStyle,
        }),
      },
      geometries: [
        {
          id: "label_1",
          styleId,
          position: center,
          content: label,
        },
      ],
    })
  },
  methods: {
    openLocation(scale, infoUrl = '') {
      const { latitude, longitude, zoom, name, address } = this.$props
      const wx = window.wx
      wx && wx.openLocation({
        latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude, // 经度，浮点数，范围为180 ~ -180。
        name, // 位置名
        address, // 地址详情说明
        scale: scale || zoom, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl, // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
  },
};
</script>
