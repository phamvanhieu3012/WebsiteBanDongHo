import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import LockIcon from "@mui/icons-material/Lock";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./ResetPassword.scss";
import { Box, Button, Container, Paper } from "@mui/material";

function ResetPassword() {
  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      password,
      confirmPassword,
    };

    // myForm.set("password", password);
    // myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Cập nhật mật khẩu thành công");

      history.push("/login");
    }
  }, [dispatch, error, history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Đặt lại mật khẩu" />
          <Container className="resetPasswordContainer">
            <Box className="resetPasswordBox">
              <Paper className="resetPasswordPaper" elevation={3}>
                <h4 className="resetPasswordHeading">Cập nhật mật khẩu</h4>

                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <div>
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Mật khẩu mới"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="resetPasswordBtn"
                    variant="contained"
                  >
                    Cập nhật
                  </Button>
                </form>
              </Paper>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword;
