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
