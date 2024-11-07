<p align="center">

[//]: # (  <a target="_blank"><img src="https://raw.githubusercontent.com/nestipy/nestipy/release-v1/nestipy.png" width="200" alt="Nestipy Logo" /></a></p>)
<p align="center">
    <a href="https://pypi.org/project/pywui">
        <img src="https://img.shields.io/pypi/v/pywui?color=%2334D058&label=pypi%20package" alt="Version">
    </a>
    <a href="https://pypi.org/project/pywui">
        <img src="https://img.shields.io/pypi/pyversions/nestipy.svg?color=%2334D058" alt="Python">
    </a>
    <a href="https://github.com/tsiresymila1/pywui/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/tsiresymila1/pywui" alt="License">
    </a>
</p>

## Description

<p>Pywui is a Python package wrapper for pywebview to make easy the communication between python and js </p>

## Getting started

```cmd
    pip install pywui
```

## Exampple

```python
import webview

from pywui import command, PyWuiApp, PyWuiWindow, listener


@listener("message", inject_window=True)
def on_message(window: PyWuiWindow, message: str):
    print("Message received: {!r}".format(message))


@command(inject_window=True)
def greet(window: PyWuiWindow):
    # window.toggle_fullscreen()
    window.emit("message", "Hello from python")
    print("Hello :::", window)
    return "Hello World!"


app = PyWuiApp(
    "Main Window",
    'http://localhost:5174',
    confirm_close=True
)
main_window = app.get_main_window()
app.run(debug=True)


```

## Stay in touch

- Author - [Tsiresy Mila](https://tsiresymila.vercel.app)

## License

PyWui is [MIT licensed](LICENSE).
